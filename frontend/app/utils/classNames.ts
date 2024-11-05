export function classNames(...classNames: (string | boolean | undefined | null)[]) {
  return classNames.filter(Boolean).join(" ")
}
