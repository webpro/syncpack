import * as Data from '@effect/data/Data';
import * as Effect from '@effect/io/Effect';
import { SemverGroupReport } from '.';
import type { SemverGroupConfig } from '../config/types';
import type { Instance } from '../get-package-json-files/instance';

export class IgnoredSemverGroup extends Data.TaggedClass('Ignored')<{
  config: SemverGroupConfig.Ignored;
  instances: Instance[];
}> {
  constructor(config: SemverGroupConfig.Ignored) {
    super({
      config,
      instances: [],
    });
  }

  canAdd(_: Instance): boolean {
    return true;
  }

  inspect(): Effect.Effect<never, never, SemverGroupReport.Ignored>[] {
    return this.instances.map((instance) =>
      Effect.succeed(
        new SemverGroupReport.Ignored({
          name: instance.name,
          instance,
          isValid: true,
        }),
      ),
    );
  }
}
