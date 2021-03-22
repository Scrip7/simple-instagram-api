export interface InstagramPostResponse {
  id: string;
  code: string;
  is_video: boolean;
  url: string;
  caption?: string;
  children: InstagramPostChild[];
}

export interface InstagramPostChild {
  id: string;
  code: string;
  is_video: boolean;
  url: string;
}

export interface InstagramAdditionalDataResponse {
  shortcode_media: InstagramAdditionalData;
}

interface InstagramAdditionalData {
  __typename: string;
  id: string;
  shortcode: string;
  display_url: string;
  is_video: boolean;
  video_url?: string;
  title?: string; // only for IGTV videos. It counts as caption I guess?
  edge_media_to_caption?: {
    edges: InstagramAdditionalDataCaptionEdge[];
  };
  edge_sidecar_to_children?: {
    edges: InstagramAdditionalDataChildren[];
  };
}

interface InstagramAdditionalDataCaptionEdge {
  node: {
    text: string;
  };
}

export interface InstagramAdditionalDataChildren {
  node: {
    id: string;
    shortcode: string;
    is_video: boolean;
    video_url?: string;
    display_url: string;
  };
}
