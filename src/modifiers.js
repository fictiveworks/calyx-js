const SPACE_CHAR = " ";

class Modifiers {
  upper(input) {
    return input.toUpperCase();
  }

  lower(input) {
    return input.toLowerCase();
  }

  title(input) {
    return input
      .toLowerCase()
      .split(SPACE_CHAR)
      .map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(SPACE_CHAR);
  }

  sentence() {
    let output = input.toLowerCase();
    return output.replace(output[0], output[0].toUpperCase());
  }
}

export default Modifiers;
