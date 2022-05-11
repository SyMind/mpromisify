import promisify from '../src'

namespace setStorage {
    export type Param = {
        /**
         * 本地缓存中的指定的 key
         */
        key: string
        /**
         * 需要存储的内容
         */
        data: any | string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    type ParamPropSuccess = () => any
    /**
     * 接口调用失败的回调函数
     */
    type ParamPropFail = () => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ParamPropComplete = () => any
}

namespace getStorage {
    export type Param = {
        /**
         * 本地缓存中的指定的 key
         */
        key: string
        /**
         * 接口调用的回调函数,res = {data: key对应的内容}
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用的回调函数,res = {data: key对应的内容}
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * key对应的内容
         */
        data: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}

namespace clearStorage {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ParamPropComplete = () => any
}

test('required success callback', async () => {
    const fn = jest.fn()
    function getStorage(param: getStorage.Param): void {
        fn(param)
        param.success({data: 'world'})
    }
    await promisify(getStorage)({key: 'hello'})
    expect(fn).toHaveBeenCalledTimes(1)
    const param = fn.mock.calls[0][0]
    expect(param.key).toBe('hello')
    expect(typeof param.success).toBe('function')
    expect(typeof param.fail).toBe('function')
})

test('optional success callback', async () => {
    const fn = jest.fn()
    function setStorage(param: setStorage.Param): void {
        fn(param)
        if (param.success) {
            param.success()
        }
    }
    const res /* $ExpectType void */ = await promisify(setStorage)({
        key: 'hello',
        data: 'world'
    })
    expect(fn).toHaveBeenCalledTimes(1)
    const param = fn.mock.calls[0][0]
    expect(param.key).toBe('hello')
    expect(param.data).toBe('world')
    expect(typeof param.success).toBe('function')
    expect(typeof param.fail).toBe('function')
})

test('called with empty option', async () => {
    const fn = jest.fn()
    function clearStorage(param?: clearStorage.Param): void {
        fn(param)
        if (param && param.success) {
            param.success({data: 'world'})
        }
    }
    await promisify(clearStorage)(undefined)
    expect(fn).toHaveBeenCalledTimes(1)
    const param = fn.mock.calls[0][0]
    expect(typeof param.success).toBe('function')
    expect(typeof param.fail).toBe('function')
})

test('called success', async () => {
    function getStorage(param: getStorage.Param): void {
        param.success({data: 'world'})
    }
    const res /* $ExpectType getStorage.ParamPropSuccessParam */ = await promisify(getStorage)({key: 'hello'})
    expect(res).toEqual({data: 'world'})
})

test('called fail', async () => {
    function getStorage(param: getStorage.Param): void {
        if (param.fail) {
            param.fail({errMsg: 'getStorage:fail data not found'})
        }
    }
    try {
        await promisify(getStorage)({key: 'hello'})
    } catch (err /* $ExpectType any */) {
        expect(err).toEqual({errMsg: 'getStorage:fail data not found'})
    }
})

test('use callback', async () => {
    function getStorage(param: getStorage.Param): void {
        param.success({data: 'world'})
    }
    const success = jest.fn()
    await promisify(getStorage)({
        key: 'hello',
        success
    })
    expect(success).toHaveBeenCalledTimes(1)
    expect(success.mock.calls[0][0]).toEqual({data: 'world'})
})
