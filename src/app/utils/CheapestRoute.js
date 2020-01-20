/* eslint-disable no-console */
import { readFileSync, appendFileSync } from 'fs';
import parse from 'csv-parse/lib/sync';

class CheapestRoute {
  loadPathsFromFile(pathsFile) {
    try {
      this.pathsFile = pathsFile;
      this.pathsFromFile = parse(readFileSync(pathsFile), {
        columns: ['start', 'end', 'price'],
        skip_empty_lines: true,
      });
    } catch (e) {
      console.log(`Error while trying to load the TXT/CSV input file: ${e}`);
      process.exit();
    }
  }

  getCheapestRoute(start, end) {
    this.bestPrice = 0;
    const actualPaths = [];
    const result = [];
    let cheapestRoute = {
      error: `There is no suggestion for the route ${start}-${end}`,
    };
    let route = [];
    let price = 0;

    if (start === end) return cheapestRoute;

    const startFilter = this.pathsFromFile.filter(path => {
      return path.start === start;
    });

    const endFilter = this.pathsFromFile.filter(path => {
      return path.end === end;
    });

    if (startFilter.length === 0 || endFilter.length === 0) {
      return cheapestRoute;
    }

    this.getPathsBetweenStartAndEnd(
      this.pathsFromFile,
      start,
      end,
      actualPaths,
      result
    );

    result.forEach(pathsResult => {
      pathsResult.forEach((path, index) => {
        if (index === 0) {
          route.push(path.start);
          route.push(path.end);
          price += Number(path.price);
        } else {
          route.push(path.end);
          price += Number(path.price);
        }
      });

      if (!cheapestRoute.price) {
        cheapestRoute = { route, price };
      } else if (cheapestRoute.price > price) {
        cheapestRoute = { route, price };
      }
      route = [];
      price = 0;
    });

    return cheapestRoute;
  }

  getPathsBetweenStartAndEnd(paths, start, end, actualPaths, result) {
    const filteredPaths = paths.filter(path => {
      return path.start === start;
    });

    if (actualPaths.length > 0) {
      if (actualPaths[actualPaths.length - 1].end === end) {
        let actualPathPrice = 0;
        actualPaths.forEach(actualPath => {
          actualPathPrice += Number(actualPath.price);
        });
        if (this.bestPrice === 0 || this.bestPrice > actualPathPrice) {
          this.bestPrice = actualPathPrice;
          return result.push(actualPaths);
        }
      }
    }

    filteredPaths.forEach(path => {
      let skip = false;
      const startFilteredPaths = path.start;

      let actualPathPrice = 0;
      actualPaths.forEach(actualPath => {
        if (startFilteredPaths === actualPath.start) {
          skip = true;
        }
        actualPathPrice += Number(actualPath.price);
        if (this.bestPrice < actualPathPrice && this.bestPrice > 0) {
          skip = true;
        }
      });

      if (!skip) {
        const actualPathsAux = actualPaths.slice(0);
        actualPathsAux.push(path);
        this.getPathsBetweenStartAndEnd(
          paths,
          path.end,
          end,
          actualPathsAux,
          result
        );
      }
    });

    return result;
  }

  addNewRoute(start, end, price) {
    const filter = this.pathsFromFile.filter(path => {
      return path.start === start;
    });

    let alreadyAdded = false;
    filter.forEach(path => {
      if (path.end === end) {
        alreadyAdded = true;
      }
    });

    if (alreadyAdded) {
      return {
        error: `Route already added '${start},${end},${price}'`,
      };
    }

    try {
      appendFileSync(this.pathsFile, `\r\n${start},${end},${price}`, 'utf8');
      this.pathsFromFile.push({ start, end, price });
    } catch (e) {
      return {
        error: `Error while trying to add the new route '${start},${end},${price}' ${e}`,
      };
    }

    return { start, end, price };
  }
}

export default new CheapestRoute();
