import axios from "axios";
export const findAddress = async (address) => {
  const token = "2d2661db192f6df92b03d31050b63d8998dea6e1";
  try {
    const response = await axios.post(
      "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      {
        query: address,
        location: { country: "Russia" },
        count: 12,
        restrict_value: "true",
        with_flat_type: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + token,
        },
      }
    );

    const addresses = response.data;
    return addresses;
  } catch (error) {
    console.log(error);
    return false;
  }
};
