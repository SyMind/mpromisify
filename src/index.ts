interface MethodOptionLike {
    success?: (arg: any) => void
    fail?: (err: any) => void
}

type OptionPropSuccessParam<T extends MethodOptionLike> = T extends { success?: (arg: infer P) => any } ? P : never

type PartialOptionPropSuccess<T extends MethodOptionLike | undefined> = T extends MethodOptionLike ? Omit<T, 'success'> & { success?: (arg: any) => void } : undefined

function promisify<P extends MethodOptionLike>(fn: ((option: P) => void) | ((option?: P) => void))
    : (option?: PartialOptionPropSuccess<P>) => Promise<OptionPropSuccessParam<P>> {

    return (option?: PartialOptionPropSuccess<P>) => new Promise<OptionPropSuccessParam<P>>((resolve, reject) => {
        const opt = (option || {}) as P
        const {success, fail} = opt
        opt.success = value => {
            if (success) {
                success(value)
            }
            resolve(value)
        }
        opt.fail = err => {
            if (fail) {
                fail(err)
            }
            reject(err)
        }
        fn(opt)
    })
}

export default promisify
