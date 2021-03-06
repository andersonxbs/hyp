declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "@hyp/common" {
  const emitEvent: any;
  const counterSubject: any;
  const listenEvent: any;

  export { emitEvent, listenEvent, counterSubject };
}