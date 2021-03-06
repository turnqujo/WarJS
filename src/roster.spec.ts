import { createRoster, findPlayerByName } from './roster';
import { Player } from './player';

describe('Create a Roster of Players', () => {
  test('Should create a collection of players', () => {
    const subject = createRoster(2);
    expect(subject.length).toBe(2);
  });

  test('Should give the players unique names', () => {
    const subject = createRoster(4);
    const duplicates = subject
      .map((player: Player) => player.name)
      .reduce((duplicates: string[], current: string, i: number, names: string[]) => {
        if (names.indexOf(current) !== i && duplicates.indexOf(current) === -1) {
          duplicates.push(current);
        }

        return duplicates;
      }, []);

    expect(duplicates.length).toBe(0);
  });
});

describe('Find a player by name in a given roster', () => {
  test('Should return the player if it is found', () => {
    const playerA: Player = { name: 'Player A', hand: [] };
    const playerB: Player = { name: 'Player B', hand: [] };
    const playerC: Player = { name: 'Player C', hand: [] };
    const roster: Player[] = [playerA, playerB, playerC];

    expect(findPlayerByName(roster, playerB.name)).toEqual(playerB);
  });

  test('Should throw if the player is not in the given roster', () => {
    const playerA: Player = { name: 'Player A', hand: [] };
    const playerB: Player = { name: 'Player B', hand: [] };
    const playerC: Player = { name: 'Player C', hand: [] };
    const roster: Player[] = [playerA, playerB, playerC];

    expect(() => findPlayerByName(roster, 'I do not exist!')).toThrow();
  });
});
