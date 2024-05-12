export const TAX_EXPRESSION = {
  US: {
    mask: "0000-LLL-##0000000",
    example: "1234-ABC-1234567",
    definitions: {
      "#": /[1-9]/,
      L: /[a-zA-Z]/,
      "##": /[0-9]/,
    },
  },
  CA: {
    mask: "#0000000000-LL",
    example: "1234567890-AB",
    definitions: {
      "#": /[1-9AaBbDd]/,
      L: /[a-zA-Z]/,
    },
  },
  NO_EXPRESSION: {
    mask: "[*****************]",
    example: "ABC123",
  },
};
