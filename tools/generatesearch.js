export default function generateSearch(name) {

  name = name.toLowerCase()

  const offset = {
    q: ["1", "2", "w", "a"],
    w: ["1", "2", "3", "q", "a", "s", "e"],
    e: ["2", "3", "4", "r", "d", "s", "w"],
    r: ["3", "4", "5", "e", "d", "f", "t"],
    t: ["4", "5", "6", "r", "f", "g", "y"],
    y: ["5", "6", "7", "t", "g", "h", "u"],
    u: ["6", "7", "8", "y", "h", "j", "i"],
    i: ["7", "8", "9", "u", "j", "k", "o"],
    o: ["8", "9", "0", "i", "j", "k", "o"],
    p: ["9", "0", "o", "l"],

    a: ["q", "w", "s", "z"],
    s: ["a", "w", "e", "d", "x", "z"],
    d: ["s", "e", "r", "f", "c", "x", "z"],
    f: ["d", "r", "t", "g", "v", "c", "x"],
    g: ["F", "t", "y", "h", "b", "v", "c"],
    h: ["g", "y", "u", "j", "n", "b", "v"],
    j: ["h", "u", "i", "k", "m", "n", "b"],
    k: ["j", "i", "o", "l", "m", "n"],
    l: ["p", "o", "k", "m"],

    z: ["a", "s", "d", "x", " "],
    x: ["z", "s", "d", "f", "c", " "],
    c: ["x", "d", "f", "g", "v", " "],
    v: ["c", 'f', "g", "h", "b", " "],
    b: ["v", "g", "h", "j", "n", " "],
    n: ["b", "h", "j", "k", "m", " "],
    m: ["n", "j", "k", "l", " "],
  }

  const arr = []
  let short = ''
  name.split('').forEach((character) => {
    console.log("0 " + character)
    arr.push(short + character)

    offset[character].forEach((character) => {
      console.log("1 " + character)
      arr.push(short + character)
    })

    short += character
  })
  return arr
}