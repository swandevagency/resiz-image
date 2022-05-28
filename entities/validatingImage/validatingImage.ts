export default function ({ image }: any): any {
  // checking if image is defined
  if (!objectChecker(image)) {
    throw new Error('image should be valid and it must be object')
  }

  //checking if alt is defined
  if (!image.alt || typeof image.alt !== 'string') {
    throw new Error('alt property is required and it must be as type string')
  }

  // checking if alt is more than 100 characters
  if (image.alt.length > 100) {
    throw new Error('alt property can not be more than 100 characters')
  }

  // checking if src is a valid object
  if (!objectChecker(image.src)) {
    throw new Error('src should be valid and it must be object')
  }

  //checking if src has valid s && m && l
  if (
    !image.src.s ||
    (image.src.s && checkingUrlRegex(image.src.s)) ||
    !image.src.m ||
    (image.src.m && checkingUrlRegex(image.src.m)) ||
    !image.src.l ||
    (image.src.l && checkingUrlRegex(image.src.l))
  ) {
    throw new Error('s && m && l should be valid and it must be url')
  }

  /**
   * helpers
   */

  //checking if a data is object
  function objectChecker(data: any) {
    return typeof data === 'object' && !Array.isArray(data) && data !== null
  }

  //url regex function
  function checkingUrlRegex(data: any) {
    const url = new RegExp(
      /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm
    )
    return url.test(data)
  }

  return JSON.stringify(image)
  // return image
}
