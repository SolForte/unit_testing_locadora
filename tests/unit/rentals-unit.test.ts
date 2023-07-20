import { faker } from "@faker-js/faker";
import rentalsRepository from "../../src/repositories/rentals-repository";
import usersRepository from "../../src/repositories/users-repository";
import rentalsService from "../../src/services/rentals-service";
import moviesRepository from "../../src/repositories/movies-repository";

const MOCK_RENTAL_ID = 1;
const MOCK_USER_ID = 1;

describe("Rentals Service Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return rentals", async () => {
    jest.spyOn(rentalsRepository, "getRentals").mockResolvedValueOnce([
      {
        id: 1,
        closed: false,
        date: new Date(),
        endDate: new Date(),
        userId: 1,
      },
      {
        id: 2,
        closed: false,
        date: new Date(),
        endDate: new Date(),
        userId: 1,
      },
    ]);

    const rentals = await rentalsService.getRentals();

    expect(rentals).toHaveLength(2);
    expect(rentals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          closed: expect.any(Boolean),
          date: expect.any(Date),
          endDate: expect.any(Date),
          userId: expect.any(Number),
        }),
      ])
    );
  });

  it("should return rental by id", async () => {
    jest.spyOn(rentalsRepository, "getRentalById").mockResolvedValueOnce({
      id: MOCK_RENTAL_ID,
      date: new Date(),
      endDate: new Date(),
      userId: MOCK_USER_ID,
      closed: false,
      movies: [],
    });

    const rentals = await rentalsService.getRentalById(MOCK_RENTAL_ID);

    expect(rentals).toEqual({
      id: MOCK_RENTAL_ID,
      date: expect.any(Date),
      endDate: expect.any(Date),
      userId: MOCK_USER_ID,
      closed: expect.any(Boolean),
      movies: expect.any(Array),
    });
  });
});
