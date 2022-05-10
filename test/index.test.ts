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

/**
 * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
 */
function setStorage(param: setStorage.Param): void {
}

promisify(setStorage) // $ExpectType Promise<any>

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

/**
 * 从本地缓存中异步获取指定 key 对应的内容。
 */
function getStorage(param: getStorage.Param): void {
}

promisify(getStorage) // $ExpectType Promise<getStorage.ParamPropSuccessParam>
