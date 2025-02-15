import * as Effect from '@effect/io/Effect';
import { formatCli } from '../../../src/bin-format/format-cli';
import { mockPackage } from '../../mock';
import { createScenario } from '../lib/create-scenario';

/** "repository" contains a github URL which can be shortened further */
describe('format', () => {
  it('uses github shorthand format for "repository"', () => {
    const scenario = getScenario();
    Effect.runSync(formatCli(scenario.config.cli, scenario.env));
    expect(scenario.env.writeFileSync.mock.calls).toEqual([
      scenario.files['packages/a/package.json'].diskWriteWhenChanged,
    ]);

    function getScenario() {
      return createScenario(
        [
          {
            path: 'packages/a/package.json',
            before: mockPackage('a', {
              omitName: true,
              otherProps: {
                repository: {
                  url: 'git://github.com/User/repo',
                  type: 'git',
                },
              },
            }),
            after: mockPackage('a', {
              omitName: true,
              otherProps: {
                repository: 'User/repo',
              },
            }),
          },
        ],
        { cli: {}, rcFile: {} },
      );
    }
  });
});
