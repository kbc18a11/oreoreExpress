const connection = require('../database/mysqlConnection');
require('date-utils');

class AbstractModel {
    constructor() {
    }

    /**
     * テーブル名を取得する抽象メソッド
     * @abstract
     * @returns {string}
     */
    static get abstractTABLE_NAME() {
    }

    /**
     *  バリデーションのルールを返す抽象メソッド
     *  @abstract
     *  @return {Object}
     */
    static get abstractVALIDATIONRULES() {
    }

    /**
     * 対応したテーブルのレコードをすべて取得
     * @returns {Promise<*>}
     */
    static async all() {
        const sql = 'SELECT * FROM ??';
        //const errorSql = 'SELECT * FROM ?';

        //SQLを実行(rowsがSQLの実行結果)
        const [rows, fields] = await connection.query(sql, [this.abstractTABLE_NAME]);

        //console.log(rows);
        return rows;
    }

    /**
     * idからカラムを取得
     * @param {number}id
     * @return {Promise<*>}
     */
    static async find(id) {
        const sql = `SELECT * FROM ${this.abstractTABLE_NAME} WHERE id = ?;`;

        //SQLを実行(rowsがSQLの実行結果)
        const [rows, fields] = await connection.query(sql, [id]);

        console.log(rows);
        //レコードを返す
        return rows;
    }

    /**
     * idからカラムの存在確認をする
     * @param {number} id
     * @return {Promise<*>}
     */
    static async existId(id) {
        const sql = `SELECT * FROM ${this.abstractTABLE_NAME} WHERE id = ?;`;

        //SQLを実行(rowsがSQLの実行結果)
        const [rows, fields] = await connection.query(sql, [id]);

        //レコードは存在しているか？
        if (rows.length > 0) {
            console.log(rows);
            return true;
        }
        //レコードは存在しなかった
        return false;
    }

    /**
     * INSERT文を実行
     * @param insertParam
     * @param{string} sql
     * @returns {Promise<void>}
     */
    static async insert(insertParam) {
        const sql = `INSERT ${this.abstractTABLE_NAME} SET ?;`;//INSERT文

        //create_at用の日付時間取得
        insertParam.created_at = new Date().toFormat('YYYY-MM-DD HH:MI:SS');

        //console.log(insertParam);
        //SQLを実行
        await connection.query(sql, insertParam);
    }

    /**
     * UPDATE文実行
     * @abstract
     * @param {Object} insertParam
     * @param {string} sql
     */
    static async update(insertParam, sql) {
        //SQLを実行
        await connection.query(sql, [insertParam.text, insertParam.updated_at, insertParam.id]);
    }

    /***
     * レコードの削除
     * @param {Object} insertParam
     * @return {Promise<void>}
     */
    static async delete(id) {
        //DELETE文
        const sql = `DELETE FROM ${this.abstractTABLE_NAME} WHERE id = ?`;

        //SQLを実行
        await connection.query(sql, [id]);
    }
}

module.exports = AbstractModel;