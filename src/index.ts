import https from "https";
import {
  InstagramAdditionalDataResponse,
  InstagramPostResponse,
} from "./types";

export class InstagramApi {
  async get(code: string) {
    if (!code) throw new Error("Post code is required.");
    const htmlPage = await this.sendHttpRequest(code);
    const regexResults = /window\.__additionalDataLoaded\('extra'\,(.*?)\)\;<\/script>/gs.exec(
      htmlPage
    );
    if (!regexResults)
      throw new Error("Regex failed! Could not get additional data");
    const additionalData = JSON.parse(regexResults[1]);
    if (additionalData) {
      return this.mapAdditionalData(additionalData);
    } else {
      return this.mapHtmlPage(htmlPage);
    }
  }

  private mapAdditionalData(
    data: InstagramAdditionalDataResponse
  ): InstagramPostResponse {
    const media = data.shortcode_media;
    return {
      // type: media.__typename,
      id: media.id,
      code: media.shortcode,
      is_video: media.is_video,
      url: media.video_url || media.display_url,
      caption: media.edge_media_to_caption
        ? media.edge_media_to_caption.edges[0].node.text
        : undefined,
      children: media.edge_sidecar_to_children
        ? media.edge_sidecar_to_children.edges.map((edge) => {
            return {
              // type: edge.node.__typename,
              id: edge.node.id,
              code: edge.node.shortcode,
              is_video: edge.node.is_video,
              url: edge.node.video_url || edge.node.display_url,
            };
          })
        : [],
    };
  }

  private mapHtmlPage(html: string) {
    /**
     * Extract id
     */
    const regexMediaIdResult = /data-media-id=\"(.*?)\"/gs.exec(html);
    if (!regexMediaIdResult) throw new Error("Could not extract post media id");

    /**
     * Extract code
     */
    const regexCodeResult = /instagram\.com\/p\/(.*?)\//gs.exec(html);
    if (!regexCodeResult) throw new Error("Could not extract post code");

    /**
     * Extract url
     */
    const regexUrlResult = /class=\"Content(.*?)src=\"(.*?)\"/gs.exec(html);
    if (!regexUrlResult) throw new Error("Could not extract post url");

    /**
     * Extract caption
     */
    let caption = undefined;
    try {
      const regexCaptionResult = /class=\"Caption\"(.*?)class=\"CaptionUsername\"(.*?)<\/a>(.*?)<div/gs.exec(
        html
      );
      if (!regexCaptionResult)
        throw new Error("Could not extract post caption");

      /**
       * Replace all html tags and trim the result
       */
      caption = regexCaptionResult[3].replace(/<[^>]*>/g, "").trim();
    } catch (err) {
      // Silence is golden :)
    }

    return {
      id: regexMediaIdResult[1],
      code: regexCodeResult[1],
      is_video: false,
      url: decodeURI(regexUrlResult[2]).replace(/amp\;/g, ""),
      caption: caption,
      children: [],
    };
  }

  private getUrl(input: string) {
    return `https://www.instagram.com/p/${input}/embed/captioned/`;
  }

  private async sendHttpRequest(input: string): Promise<string> {
    return new Promise((resolve, reject) => {
      https
        .get(this.getUrl(input), (resp) => {
          let data: string;

          // A chunk of data has been received.
          resp.on("data", (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            return resolve(data);
          });
        })
        .on("error", (err) => {
          return reject("Error: " + err.message);
        });
    });
  }
}
