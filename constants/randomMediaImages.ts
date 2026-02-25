import { ImageSourcePropType } from "react-native";

const RANDOM_MEDIA_IMAGES: ImageSourcePropType[] = [
    require("../portadas/Bad Bunny - EL ÚLTIMO TOUR DEL MUNDO (2020).jpeg"),
    require("../portadas/DAISY-Rusowsky.jpeg"),
    require("../portadas/D_Valentino.jpeg"),
    require("../portadas/JACKBOYS - JACKBOYS.jpeg"),
    require("../portadas/La Espalda del Sol-Diego 900.jpeg"),
    require("../portadas/Lil Uzi Vert - Pink Tape.jpeg"),
    require("../portadas/Michael Jackson - Thriller.jpeg"),
    require("../portadas/Moonlight922 by Cruz Cafuné.jpeg"),
    require("../portadas/SAN JORGE.jpeg"),
    require("../portadas/Travis Scott.jpeg"),
    require("../portadas/YHLQMDLG; Bad Bunny.jpeg"),
    require("../portadas/[ C_ Tangana - Avida Dollars ].jpeg"),
    require("../portadas/_ (1).jpeg"),
    require("../portadas/_ (10).jpeg"),
    require("../portadas/_ (11).jpeg"),
    require("../portadas/_ (12).jpeg"),
    require("../portadas/_ (13).jpeg"),
    require("../portadas/_ (14).jpeg"),
    require("../portadas/_ (2).jpeg"),
    require("../portadas/_ (3).jpeg"),
    require("../portadas/_ (4).jpeg"),
    require("../portadas/_ (5).jpeg"),
    require("../portadas/_ (6).jpeg"),
    require("../portadas/_ (7).jpeg"),
    require("../portadas/_ (8).jpeg"),
    require("../portadas/_ (9).jpeg"),
    require("../portadas/_.jpeg"),
    require("../portadas/album cover.jpeg"),
    require("../portadas/beerbong & bentleys.jpeg"),
    require("../portadas/ctangana.jpeg"),
    require("../portadas/the bends album cover.jpeg"),
    require("../portadas/🤑tuff.jpeg"),
];

export const getRandomMediaImage = (): ImageSourcePropType => {
    const randomIndex = Math.floor(Math.random() * RANDOM_MEDIA_IMAGES.length);
    return RANDOM_MEDIA_IMAGES[randomIndex];
};
