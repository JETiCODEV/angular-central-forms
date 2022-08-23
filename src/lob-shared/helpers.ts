import { AbstractControl } from "@angular/forms";

export function getControlName(c: AbstractControl): string | null {
  if (!c.parent) return null;
  const formGroup = c.parent.controls;
  return Object.keys(formGroup).find((name) => c === formGroup[name]) || null;
}

export function getControlPath(
  c: AbstractControl,
  path: string = ""
): string | null {
  path = getControlName(c) + path;

  if (c.parent && getControlName(c.parent)) {
    path = "." + path;
    return getControlPath(c.parent, path);
  } else {
    return path;
  }
}
