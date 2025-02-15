import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import chalk from 'chalk';
import { ICON } from '../constants';
import type {
  SemverRangeEffectInput as Input,
  SemverRangeEffects,
} from '../create-program/effects';
import type { SemverGroupReport } from '../get-semver-groups';
import { logGroupHeader } from '../lib/log-group-header';

export const lintSemverRangesEffects: SemverRangeEffects<void> = {
  onFilteredOut() {
    return Effect.unit();
  },
  onIgnored() {
    return Effect.unit();
  },
  onValid() {
    return Effect.unit();
  },
  onSemverRangeMismatch(input) {
    return Effect.sync(() => pipe(input, logHeader, logRangeMismatch));
  },
  onUnsupportedVersion(input) {
    return Effect.sync(() => pipe(input, logHeader, logUnsupportedVersion));
  },
  onWorkspaceSemverRangeMismatch(input) {
    return Effect.sync(() => pipe(input, logHeader, logRangeMismatch));
  },
  onComplete() {
    return Effect.unit();
  },
};

function logHeader<T extends SemverGroupReport.Any>(input: Input<T>) {
  if (input.index === 0) {
    logGroupHeader.semverGroup(input.group, input.index);
  }
  return input;
}

function logRangeMismatch({ report, ctx }: Input<SemverGroupReport.FixableCases>) {
  ctx.isInvalid = true;
  console.log(
    chalk`{red %s} %s {red %s} %s {green %s} {dim in %s of %s}`,
    ICON.cross,
    report.name,
    report.instance.version,
    ICON.rightArrow,
    report.expectedVersion,
    report.instance.strategy.path,
    report.instance.packageJsonFile.shortPath,
  );
}

function logUnsupportedVersion({ report }: Input<SemverGroupReport.UnsupportedVersion>) {
  console.log(
    chalk`{yellow %s} %s {yellow %s} {dim ignored as a format which syncpack cannot apply semver ranges to}`,
    ICON.panic,
    report.name,
    report.instance.version,
  );
}
