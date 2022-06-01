const mockResponse = [
  {
    name: "Afghanistan",
    iso2: "AF",
    long: 65,
    lat: 33,
  },
];

export default {
  get: jest.fn().mockResolvedValue(mockResponse),
};
