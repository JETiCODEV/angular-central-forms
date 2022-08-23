import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import * as lodash from 'lodash';

const isObject = (x: unknown) => x instanceof Object;
const isValue = (x: unknown) => !isObject(x) && !Array.isArray(x);
const isFormArray = (x: AbstractControl) => x instanceof FormArray;
const compareValues = (value1: string | object | Date, value2: unknown) => {
    if (value1 === value2) {
        return 'unchanged';
    }
    if (
        value1 instanceof Date &&
        value2 instanceof Date &&
        value1.getTime() === value2.getTime()
    ) {
        return 'unchanged';
    }
    if (value1 === undefined) {
        return 'created';
    }
    if (value2 === undefined) {
        return 'deleted';
    }
    return 'updated';
};

type ChangesType = 'unchanged' | 'created' | 'deleted' | 'updated';
export type FormControls = FormGroup | FormArray | FormControl;
declare type IsAny<T, Y, N> = 0 extends 1 & T ? Y : N;
export declare type TypedOrUntyped<T, Typed, Untyped> = IsAny<T,
    Untyped,
    Typed>;
export declare type RawValue<T extends AbstractControl | undefined> =
    T extends AbstractControl<any, any>
        ? T["setValue"] extends (v: infer R) => void
            ? R
            : never
        : never;
export declare type FormGroupRawValue<T extends {
    [K in keyof T]?: AbstractControl<any>;
}> = TypedOrUntyped<T,
    {
        [K in keyof T]: RawValue<T[K]>;
    },
    {
        [key: string]: any;
    }>;

export type DiffOutput = {
    type: ChangesType,
    previous: any,
    formControl?: FormControls
}

export const deepDiffMapper = (
    obj1: any,
    obj2: any,
    formGroup: FormControls,
    output: Array<DiffOutput>
) => {
    let key;
    if (isFormArray(formGroup) && !lodash.isEqual(obj1, obj2)) {
        output.push({
            type: compareValues(obj1, obj2),
            previous: obj1 === undefined ? obj2 : obj1,
            formControl: formGroup,
        });
    }

    if (isValue(obj1) || isValue(obj2)) {
        const compare = compareValues(obj1, obj2);

        output.push({
            type: compare,
            previous: obj1 === undefined ? obj2 : obj1,
            formControl: formGroup,
        });
        return {
            type: compare,
            data: obj1 === undefined ? obj2 : obj1,
        };
    }

    const diff = {};
    for (key in obj1) {
        let value2 = undefined;
        if (obj2[key] !== undefined) {
            value2 = obj2[key];
        }

        diff[key] = deepDiffMapper(
            obj1[key],
            value2,
            formGroup instanceof FormControl ? formGroup : formGroup.controls[key],
            output
        );
    }

    for (key in obj2) {
        if (diff[key] !== undefined) {
            continue;
        }

        diff[key] = deepDiffMapper(
            undefined,
            obj2[key],
            formGroup instanceof FormControl ? formGroup : formGroup.controls[key],
            output
        );
    }

    return diff;
};