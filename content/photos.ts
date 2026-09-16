// ============================================================
//  PHOTOS CONFIG
//  Add your 20 photos as public/photos/01.jpg … 20.jpg
//  Run: npm run optimize:images  (after placing originals in /public/photos/originals/)
// ============================================================

export interface PhotoItem {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  blurDataURL: string;
}

export const photos: PhotoItem[] = [
  {
    src: "/photos/01.jpg",
    width: 720,
    height: 960,
    alt: "Burhanuddin — moment 1", // TODO: personalise alt text
    caption: "That smile that says it all", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAVABADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAMFAgT/xAAcEAACAgIDAAAAAAAAAAAAAAAAAQIDERITFCH/xAAUAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhEDEQA/AIHXwhFlJUsiK4tmNhjqlFGV4AAY/9k=",
  },
  {
    src: "/photos/02.jpg",
    width: 720,
    height: 960,
    alt: "Burhanuddin — moment 2", // TODO: personalise alt text
    caption: "Living in the moment", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAVABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEBf/EABoQAAIDAQEAAAAAAAAAAAAAAAACAQMRBCH/xAAWAQEBAQAAAAAAAAAAAAAAAAACAAH/xAAXEQEAAwAAAAAAAAAAAAAAAAAAAQIR/9oADAMBAAIRAxEAPwBVbTppc1uQZ9K6VJ4Cat1Ik4PVpABJ/9k=",
  },
  {
    src: "/photos/03.jpg",
    width: 720,
    height: 720,
    alt: "Burhanuddin — moment 3", // TODO: personalise alt text
    caption: "Pure gold, right here", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIDBP/EABkQAAMBAQEAAAAAAAAAAAAAAAABAwIRIf/EABUBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAABIB/9oADAMBAAIRAxEAPwAVp4Z+tstXLFnjrIvTL//Z",
  },
  {
    src: "/photos/04.jpg",
    width: 720,
    height: 720,
    alt: "Burhanuddin — moment 4", // TODO: personalise alt text
    caption: "Couldn't have scripted this better", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIDBf/EABwQAAICAgMAAAAAAAAAAAAAAAABAwQCERIxUf/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAXEQADAQAAAAAAAAAAAAAAAAAAAQMS/9oADAMBAAIRAxEAPwDTxtv0WW29dklFoDi5AdkHJ//Z",
  },
  {
    src: "/photos/05.jpg",
    width: 720,
    height: 960,
    alt: "Burhanuddin — moment 5", // TODO: personalise alt text
    caption: "The one who makes it look easy", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAVABADASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAQBAv/EABsQAAMAAwEBAAAAAAAAAAAAAAABAgMEMSFB/8QAFgEBAQEAAAAAAAAAAAAAAAAAAQID/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAES/9oADAMBAAIRAxEAPwCnLuOfow7jp9IthN8M1par0zzFqVKrp1MKX4AJf//Z",
  },
  {
    src: "/photos/07.jpg",
    width: 720,
    height: 720,
    alt: "Burhanuddin — moment 7", // TODO: personalise alt text
    caption: "Behind every good story", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwQF/8QAGRAAAwADAAAAAAAAAAAAAAAAAAECAxES/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDNuOmDkjSLXGgqx9Mmb//Z",
  },
  {
    src: "/photos/08.jpg",
    width: 720,
    height: 720,
    alt: "Burhanuddin — moment 8", // TODO: personalise alt text
    caption: "The vibe is unmatched", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAZEAADAQEBAAAAAAAAAAAAAAAAAQMCESH/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AK67SYk1onu/RHfGFSP/2Q==",
  },
  {
    src: "/photos/09.jpg",
    width: 720,
    height: 738,
    alt: "Burhanuddin — moment 9", // TODO: personalise alt text
    caption: "Always in his element", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAwT/xAAZEAACAwEAAAAAAAAAAAAAAAAAAQIDERL/xAAUAQEAAAAAAAAAAAAAAAAAAAAC/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AJpQ6QTpxlaxIKyaBDr/2Q==",
  },
  {
    src: "/photos/10.jpg",
    width: 720,
    height: 900,
    alt: "Burhanuddin — moment 10", // TODO: personalise alt text
    caption: "Genuine, as always", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABADASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAwABAv/EABgQAQEBAQEAAAAAAAAAAAAAAAACARED/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAECA//EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwAMjpZ88cyTK4lrRMrUhTf/2Q==",
  },
  {
    src: "/photos/11.jpg",
    width: 720,
    height: 900,
    alt: "Burhanuddin — moment 11", // TODO: personalise alt text
    caption: "The friend you call first", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABADASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAQCA//EABkQAAMBAQEAAAAAAAAAAAAAAAABAgMRMf/EABUBAQEAAAAAAAAAAAAAAAAAAAMB/8QAFxEBAQEBAAAAAAAAAAAAAAAAAAIBEv/aAAwDAQACEQMRAD8Au116zM2T3aE0Dp4rlGrbfp2lvgBaG//Z",
  },
  {
    src: "/photos/12.jpg",
    width: 720,
    height: 720,
    alt: "Burhanuddin — moment 12", // TODO: personalise alt text
    caption: "This is what joy looks like", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAQT/xAAYEAEAAwEAAAAAAAAAAAAAAAAAARETIf/EABQBAQAAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAwDAQACEQMRAD8AIs9UZHIGP//Z",
  },
  {
    src: "/photos/13.jpg",
    width: 720,
    height: 720,
    alt: "Burhanuddin — moment 13", // TODO: personalise alt text
    caption: "One of the ones you remember", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAwT/xAAZEAACAwEAAAAAAAAAAAAAAAAAAQIDETH/xAAUAQEAAAAAAAAAAAAAAAAAAAAB/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAESIf/aAAwDAQACEQMRAD8AshZgjnqJksYi4M4CZ//Z",
  },
  {
    src: "/photos/14.jpg",
    width: 720,
    height: 720,
    alt: "Burhanuddin — moment 14", // TODO: personalise alt text
    caption: "No filter needed", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAwL/xAAcEAACAQUBAAAAAAAAAAAAAAAAAwECBBESITH/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/8QAFREBAQAAAAAAAAAAAAAAAAAAAEH/2gAMAwEAAhEDEQA/AEe7EhUN24Rcx0NHolG//9k=",
  },
  {
    src: "/photos/15.jpg",
    width: 720,
    height: 900,
    alt: "Burhanuddin — moment 15", // TODO: personalise alt text
    caption: "Carrying every room since 2003", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABADASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAIBAwb/xAAYEAEBAQEBAAAAAAAAAAAAAAABAAIDEf/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAFREBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhEDEQA/AM8NKew5Sfnn1pkv7ZBlwRETj//Z",
  },
  {
    src: "/photos/16.jpg",
    width: 720,
    height: 900,
    alt: "Burhanuddin — moment 16", // TODO: personalise alt text
    caption: "That look before something legendary", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIDBP/EABsQAAICAwEAAAAAAAAAAAAAAAABAwQCERIy/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgED/8QAGREBAAIDAAAAAAAAAAAAAAAAAAFBAhJC/9oADAMBAAIRAxEAPwDRjLwWxn2jDI2mUrPpljENqLZSTHp+gAdM+n//2Q==",
  },
  {
    src: "/photos/17.jpg",
    width: 720,
    height: 720,
    alt: "Burhanuddin — moment 17", // TODO: personalise alt text
    caption: "Still him, different day", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAaEAADAQADAAAAAAAAAAAAAAAAAQIRBBNB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAwDAQACEQMRAD8Arunom2ijo3wPjko//9k=",
  },
  {
    src: "/photos/18.jpg",
    width: 576,
    height: 720,
    alt: "Burhanuddin — moment 18", // TODO: personalise alt text
    caption: "The kind of person people write about", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAEEBf/EABwQAAIBBQEAAAAAAAAAAAAAAAABAwIREiFBE//EABYBAQEBAAAAAAAAAAAAAAAAAAMCBP/EABsRAAEEAwAAAAAAAAAAAAAAAAABAgMhETFB/9oADAMBAAIRAxEAPwDRknsx0T62Z3rl0eb4GsdFo+8EMNTZbHtABo4C7Z//2Q==",
  },
  {
    src: "/photos/19.jpg",
    width: 720,
    height: 720,
    alt: "Burhanuddin — moment 19", // TODO: personalise alt text
    caption: "Eyes that have seen adventures", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQMG/8QAGxAAAQUBAQAAAAAAAAAAAAAAAQACAwQREjH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AGDZG5qvG/sLPunIf6lKUugIj//Z",
  },
  {
    src: "/photos/20.jpg",
    width: 720,
    height: 720,
    alt: "Burhanuddin — moment 20", // TODO: personalise alt text
    caption: "Here's to many more chapters", // TODO: replace with real memory/caption
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwQF/8QAGRAAAwEBAQAAAAAAAAAAAAAAAAECAxEE/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABURAQEAAAAAAAAAAAAAAAAAAAAS/9oADAMBAAIRAxEAPwAIxaki9mLfTTnaeA7ObBRS/9k=",
  }
];
