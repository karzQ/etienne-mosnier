/// <reference types="vite/client" />

export type FiltersComponent = {
    id: number,
    name: string
}

export type TextComponent = {
    id: number,
    text: string,
    font?: string = null,
    classNames?: string
}

export type ImageComponent = {
    id: number,
    src: string,
    href?: string,
    tag?: string,
    text?: string
}

export type AnnotationsComponent = {
    id: number,
    text: string
}

export type Subtitles = {
    id: number,
    text: string
}

export type PagesComponent = {
    id: number,
    title: string,
    text: string,
    texts?: TextComponent[],
    annotations?: AnnotationsComponent[],
    image: ImageComponent
}

export type GalleryComponent = {
    id: string,
    name: string,
    template: string,
    title: string,
    images: ImageComponent[],
    filters: FiltersComponent[]
}

export type TextComponent = {
    id: string,
    name: string,
    template: string,
    title: string,
    images: ImageComponent[],
    pages: PagesComponent[]
}

export type LinkComponent = {
    id: number,
    pageId: string,
}

export type HomeComponent = {
    id: string,
    name: string,
    template: string,
    title: string,
    images: ImageComponent[],
    links: LinkComponent[]
}
