const express = require('express');
const router = express.Router();
const validator = require('validatorjs');
const connection = require('../database/mysqlConnection');
const Tests = require('../model/Tests');


/**
 * @GET
 * testsのレコードをすべて取得
 */
router.get('/tests', async (req, res, next) => {

    try {
        //レコードをすべて取得
        const allRows = await Tests.all();
        //console.log(allRows);

        //レコードを返す
        return res.send(allRows);
    } catch (error) {
        //レコードの取得失敗時
        console.log(error);
        res.status(500);
        return res.send({'error': 'サーバー側でエラーが発生しました'});
    }

});

/**
 * @GET
 * 指定されたidのカラムを取得
 */
router.get('/tests/:id', async (req, res, next) => {
    //バリデーションの検証を受ける値
    const verificationValue = {
        id: req.params.id
    }
    //バリデーションの結果にエラーがあるかのチェック
    const validation = new validator(
        verificationValue,
        Tests.abstractVALIDATIONRULES.get.rule,
        Tests.abstractVALIDATIONRULES.get.errorMessage
    );
    if (validation.fails()) {
        //エラーを422で返す
        return res.status(422).send({errors: validation.errors.all()});
    }

    try {
        //レコードを取得
        const row = await Tests.find(verificationValue.id);
        //レコードを返す
        return res.send(row);
    } catch (error) {
        //レコードの取得失敗時
        console.log(error);
        res.status(500);
        return res.send({'error': 'サーバー側でエラーが発生しました'});
    }
})

/**
 * @POST
 * testsに新しいレコードを挿入
 */
router.post('/test', async (req, res, next) => {
    //バリデーションの検証を受ける値
    const verificationValue = {
        text: req.query.text
    }
    //バリデーションの結果にエラーがあるかのチェック
    const validation = new validator(
        verificationValue,
        Tests.abstractVALIDATIONRULES.post.rule,
        Tests.abstractVALIDATIONRULES.post.errorMessage
    );
    if (validation.fails()) {
        //エラーを422で返す
        return res.status(422).send({errors: validation.errors.all()});
    }

    try {
        //レコードの挿入開始
        await Tests.insert({text: req.query.text});
        return res.send({'insertResult': true});
    } catch (error) {
        //レコードの挿入失敗時
        console.log(error);
        return res.status(500).send({'insertResult': false});
    }
});

/**
 * @PUT
 * レコードの更新
 */
router.put('/test/:id', async (req, res, next) => {
    //バリデーションの検証を受ける値
    const verificationValue = {
        id: req.params.id,
        text: req.query.text
    }
    //バリデーションの結果にエラーがあるかのチェック
    const validation = new validator(
        verificationValue,
        Tests.abstractVALIDATIONRULES.put.rule,
        Tests.abstractVALIDATIONRULES.put.errorMessage
    );
    if (validation.fails()) {
        //エラーを422で返す
        return res.status(422).send({errors: validation.errors.all()});
    }

    //idは存在しないか？
    if (!await Tests.existId(verificationValue.id)) {
        //エラーを422で返す
        return res.status(422).send({
            errors: {
                id: ['idが存在しません']
            }
        });
    }

    try {
        //レコードの更新開始
        await Tests.update(verificationValue);
        return res.send({'updateResult': true});
    } catch (error) {
        //レコードの更新失敗時
        console.log(error);
        return res.status(500).send({'updateResult': false});
    }

});

/**
 * @DELETE
 * レコードの削除
 */
router.delete('/test/:id', async (req, res, next) => {
    //バリデーションの検証を受ける値
    const verificationValue = {
        id: req.params.id,
    }
    //バリデーションの結果にエラーがあるかのチェック
    const validation = new validator(
        verificationValue,
        Tests.abstractVALIDATIONRULES.delete.rule,
        Tests.abstractVALIDATIONRULES.delete.errorMessage
    );
    if (validation.fails()) {
        //エラーを422で返す
        return res.status(422).send({errors: validation.errors.all()});
    }

    //idは存在しないか？
    if (!await Tests.existId(verificationValue.id)) {
        //エラーを422で返す
        return res.status(422).send({
            errors: {
                id: ['idが存在しません']
            }
        });
    }

    try {
        //レコードの削除開始
        await Tests.delete(verificationValue.id);
        return res.send({'deleteResult': true});
    } catch (error) {
        //レコードの削除失敗時
        console.log(error);
        return res.status(500).send({'deleteResult': false});
    }


})

module.exports = router;
