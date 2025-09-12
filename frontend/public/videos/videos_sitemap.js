import { getBaseUrl } from '../../src/utils/baseUrl';
import video from './carousel-video.mp4'
export default function videoSitemap() {
  return [
    {
      url: video,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      videos: [
        {
          title: "SmachStack hero section video",
          thumbnail_loc: `${getBaseUrl()}/preview.png`,
          description:
            "A  video demonstrating SmachStack solution.",
          content_loc: `${getBaseUrl()}/chatdocsVideo.mp4`,
          upload_date: "2025-05-07",
        },
      ],
    },
  ];
}