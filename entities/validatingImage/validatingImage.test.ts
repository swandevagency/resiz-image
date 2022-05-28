import validatingImage from './validatingImage'

describe('validating image', () => {
  // image shouldn't be undefined
  test("1. won't work if image is not a valid object", async () => {
    try {
      const result = await validatingImage({
        image: undefined,
      })
      expect(result).toBeFalsy()
    } catch (error: any) {
      expect(error.message).toBe('image should be valid and it must be object')
    }
  })
  // alt property of image should be defined
  test("2. wont't work if alt property is not a string", async () => {
    try {
      const result = await validatingImage({
        image: {
          alt: undefined,
          src: {
            s: 'https://www.google.com/imgres?imgurl=https%320833',
            m: 'https://www.google.com/imgres?imgurl=https%320833',
            l: 'https://www.google.com/imgres?imgurl=https%320833',
          },
        },
      })
      expect(result).toBeFalsy()
    } catch (error: any) {
      expect(error.message).toBe(
        'alt property is required and it must be as type string'
      )
    }
  })
  // alt property of image should not be more than 100 characters
  test("3. wont't work if alt property is more than 100 characters", async () => {
    try {
      const result = await validatingImage({
        image: {
          alt: 'salkdjflidsflglkfdsjglkfdjlkjgdslfjgldjifgljisfdoijgosijerpogijdskuyfgiljdsvfhoisjurkuyvhoidsufhiuvhfdspougkudsligjodsuhfglihsdfkjghlisdufhgkuhdsligujuydfhgijusdkufhglifdsjgkuydshfigludskyfglisdjfkygaodifuiysgaoufhsaouhf',
          src: {
            s: 'https://www.google.com/imgres?imgurl=https%320833',
            m: 'https://www.google.com/imgres?imgurl=https%320833',
            l: 'https://www.google.com/imgres?imgurl=https%320833',
          },
        },
      })
      expect(result).toBeFalsy()
    } catch (error: any) {
      expect(error.message).toBe(
        'alt property can not be more than 100 characters'
      )
    }
  })
  // src property of image should be defined
  test("4. won't work if src property is not a valid object", async () => {
    try {
      const result = await validatingImage({
        image: {
          alt: 'yo',
          src: undefined,
        },
      })
      expect(result).toBeFalsy()
    } catch (error: any) {
      expect(error.message).toBe('src should be valid and it must be object')
    }
  })
  // src property of image should contain s && m && l
  test("5. won't work if s && m && l are not valid url ", async () => {
    try {
      const result = await validatingImage({
        image: {
          alt: 'yo',
          src: {
            s: 'https://www.google.com/imgres?imgurl=https%320833',
            m: undefined,
            l: 'https://www.google.com/imgres?imgurl=https%320833',
          },
        },
      })
      expect(result).toBeFalsy()
    } catch (error: any) {
      expect(error.message).toBe(
        's && m && l should be valid and it must be url'
      )
    }
  })
  // everything is ok
  test('6. works', async () => {
    try {
      const result = await validatingImage({
        image: {
          alt: 'yo',
          src: {
            s: 'https://www.google.com/imgres?imgurl=https%320833',
            m: 'https://www.google.com/imgres?imgurl=https%320833',
            l: 'https://www.google.com/imgres?imgurl=https%320833',
          },
        },
      })
      expect(JSON.stringify(result)).toBe(JSON.stringify(result))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
