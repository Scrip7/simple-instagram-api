import https from 'https';
import {
  InstagramAdditionalDataResponse,
  InstagramPostResponse,
  InstagramPostChild,
  InstagramAdditionalDataChildren,
} from './types';

export default class InstagramApi {
  static async get(code: string): Promise<InstagramPostResponse> {
    if (!code) throw new Error('Post code is required.');
    if (!code.match(/^[a-zA-Z0-9_-]*$/gi)) throw new Error('Invalid post code.');
    const htmlPage = await InstagramApi.sendHttpRequest(code);
    const regexResults = /window\.__additionalDataLoaded\('extra',(.*?)\);<\/script>/gs.exec(htmlPage);
    if (!regexResults) throw new Error('Regex failed! Could not get additional data');
    const additionalData = JSON.parse(regexResults[1]);
    if (additionalData) {
      return InstagramApi.mapAdditionalData(additionalData);
    }
    return InstagramApi.mapHtmlPage(htmlPage);
  }

  private static mapAdditionalData(data: InstagramAdditionalDataResponse): InstagramPostResponse {
    const media = data.shortcode_media;
    return {
      // type: media.__typename,
      id: media.id,
      code: media.shortcode,
      is_video: media.is_video,
      url: media.video_url || media.display_url,
      caption: media.edge_media_to_caption ? media.edge_media_to_caption.edges[0].node.text : undefined,
      children: media.edge_sidecar_to_children
        ? InstagramApi.mapPostChildren(media.edge_sidecar_to_children.edges)
        : [],
    };
  }

  private static mapPostChildren(children: InstagramAdditionalDataChildren[]): InstagramPostChild[] {
    return children.map((edge) => {
      return {
        // type: edge.node.__typename,
        id: edge.node.id,
        code: edge.node.shortcode,
        is_video: edge.node.is_video,
        url: edge.node.video_url || edge.node.display_url,
      };
    });
  }

  private static mapHtmlPage(html: string) {
    /**
     * Extract id
     */
    const regexMediaIdResult = /data-media-id="(.*?)"/gs.exec(html);
    if (!regexMediaIdResult) throw new Error('Could not extract post media id');

    /**
     * Extract code
     */
    const regexCodeResult = /instagram\.com\/p\/(.*?)\//gs.exec(html);
    if (!regexCodeResult) throw new Error('Could not extract post code');

    /**
     * Extract url
     */
    const regexUrlResult = /class="Content(.*?)src="(.*?)"/gs.exec(html);
    if (!regexUrlResult) throw new Error('Could not extract post url');

    /**
     * Extract caption
     */
    let caption;
    const regexCaptionResult = /class="Caption"(.*?)class="CaptionUsername"(.*?)<\/a>(.*?)<div/gs.exec(html);
    if (regexCaptionResult) caption = regexCaptionResult[3].replace(/<[^>]*>/g, '').trim();

    /**
     * Replace all html tags and trim the result
     */

    return {
      id: regexMediaIdResult[1],
      code: regexCodeResult[1],
      is_video: false,
      url: decodeURI(regexUrlResult[2]).replace(/amp;/g, ''),
      caption,
      children: [],
    };
  }

  private static getUrl(input: string) {
    return `https://www.instagram.com/p/${input}/embed/captioned/`;
  }

  private static async sendHttpRequest(input: string): Promise<string> {
    return new Promise((resolve, reject) => {
      https
        .get(InstagramApi.getUrl(input), (resp) => {
          let data: string;

          // A chunk of data has been received.
          resp.on('data', (chunk) => {
            data += chunk;
          });

          // The whole response has been received.
          resp.on('end', () => {
            return resolve(data);
          });
        })
        .on('error', (err) => {
          return reject(err);
        });
    });
  }
}
