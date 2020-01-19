/* eslint-disable no-console */
import { readFileSync } from 'fs';
import parse from 'csv-parse/lib/sync';

class CheapestRoute {
  loadPathsFromFile(pathsFile) {
    try {
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
    let cheapestRoute = {};
    let route = [];
    let price = 0;

    if (start === end) return cheapestRoute;

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
        cheapestRoute = { success: true, route, price };
      } else if (cheapestRoute.price > price) {
        cheapestRoute = { success: true, route, price };
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
}

export default new CheapestRoute();
