import { fighterRepository } from "../repositories/fighterRepository.js";
import { RequestError } from "../helpers/RequestError.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  getAll() {
    const fighters = fighterRepository.getAll();
    if (!fighters) {
      throw RequestError(404, "Fighters not found");
    }
    return fighters;
  }

  getFighterById(id) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) {
      throw RequestError(404, "Fighter not found");
    }
    return fighter;
  }

  addFighter(data) {
    const newFighter = fighterRepository.create(data);
    if (!newFighter) {
      throw RequestError(
        500,
        "An error occurred while adding the data into the database."
      );
    }
    return newFighter;
  }

  updateFighterById(id, data) {
    this.getFighterById(id);
    // Checks if fighter with current id exists, if not, getFighterById
    // throws an error and the method breaks.
    const updatedFighter = fighterRepository.update(id, data);
    if (!updatedFighter) {
      throw RequestError(
        500,
        "An error occurred while updating fighter in database."
      );
    }
    return updatedFighter;
  }
}

const fighterService = new FighterService();

export { fighterService };
