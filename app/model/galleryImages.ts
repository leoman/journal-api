import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export interface GalleryImageDTO {
  position: number;
  url: string;
  title: string;
}

export const galleryImageDataToObject = ({
  position,
  url,
  title,
}: GalleryImageDTO): GalleryImage => {
  const galleryImage = new GalleryImage();
  galleryImage.position = position;
  galleryImage.url = url;
  galleryImage.title = title;
  return galleryImage;
};

@Entity()
export class GalleryImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    position: number;

    @Column()
    url: string;

    @Column({
      nullable: true,
    })
    title: string;
}