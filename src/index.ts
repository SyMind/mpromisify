interface AsyncMethodOptionLike {
    success?: (arg: any) => void
    fail?: (err: any) => void
}

type OptionPropSuccessParam<T extends AsyncMethodOptionLike> = T extends { success?: (arg: infer P) => any } ? P : never

function promisify<P extends AsyncMethodOptionLike>(fn: (option: P) => void): (option: P) => Promise<OptionPropSuccessParam<P>> {
    return (option: P) => new Promise<OptionPropSuccessParam<P>>((resolve, reject) => {
        option.success = value => resolve(value)
        option.fail = err => reject(err)
        fn(option)
    })
}

export default promisify
