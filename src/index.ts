interface MethodOptionLike {
    success?: (arg: any) => void
    fail?: (err: any) => void
}

type OptionPropSuccessParam<T extends MethodOptionLike> = T extends { success?: (arg: infer P) => any } ? P : never

type PartialOptionPropSuccess<T extends MethodOptionLike> = Omit<T, 'success'> & { success?: (arg: any) => void }

function promisify<P extends MethodOptionLike>(fn: (option: P) => void): (option: PartialOptionPropSuccess<P>) => Promise<OptionPropSuccessParam<P>> {
    return (option: PartialOptionPropSuccess<P>) => new Promise<OptionPropSuccessParam<P>>((resolve, reject) => {
        const {success, fail} = option
        option.success = value => {
            if (success) {
                success(value)
            }
            resolve(value)
        }
        option.fail = err => {
            if (fail) {
                fail(err)
            }
            reject(err)
        }
        fn(option as P)
    })
}

export default promisify
