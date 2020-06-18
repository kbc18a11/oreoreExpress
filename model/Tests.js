const AbstractModel = require('./AbstractModel');
const connection = require('../database/mysqlConnection');
require('date-utils');

class Tests extends AbstractModel {
    constructor() {
        super();
    }

    /**
     * テーブル名
     * @override
     * @returns {string}
     */
    static get abstractTABLE_NAME() {
        return 'tests';
    }

    /**
     * バリデーションルール
     * @override
     * @return {Object}
     */
    static get abstractVALIDATIONRULES() {
        return {
            get:{
                rule: {
                    id: 'required|integer'
                },
                errorMessage: {
                    required: '必須項目です。',
                    integer: '数値で入力してください'
                }
            },
            //POSTリクエスト用
            post: {
                rule: {
                    text: 'required'
                },
                errorMessage: {
                    required: '必須項目です。',
                }
            },
            //PUTリクエスト用
            put: {
                rule: {
                    id: 'required|integer',
                    text: 'required'
                },
                errorMessage: {
                    required: '必須項目です。',
                    integer: '数値で入力してください'
                }
            },
            //DELETEリクエスト用
            delete: {
                rule: {
                    id: 'required|integer'
                },
                errorMessage: {
                    required: '必須項目です。',
                    integer: '数値で入力してください'
                }
            }
        };
    }

    /**
     * UPDATE文の準備を行って、親クラスのupdate()に実行をさせる
     * @param {Object} insertParam
     */
    static async update(insertParam) {
        //UPDATE文
        const sql = `UPDATE ${this.abstractTABLE_NAME} SET text = ?,updated_at = ? WHERE id = ?`;

        //create_at用の日付時間取得
        insertParam.updated_at = new Date().toFormat('YYYY-MM-DD HH:MI:SS');

        //SQLの実行
        await super.update(insertParam, sql);
    }
}

module.exports = Tests;