// 引数でcontent.textContentをstringという変数名で受け取る 2引数で制限する文字数を指定する。
function limittedContent(string, count) {
    // 定数で宣言
    const MAX_LENGTH = count;
    // もしstringの文字数がMAX_LENGTH（今回は10）より大きかったら末尾に...を付け足して返す。
    if (string.length > MAX_LENGTH) {

        // substr(何文字目からスタートするか, 最大値);
        return string.substr(0, MAX_LENGTH) + '...';
    }
    //　文字数がオーバーしていなければそのまま返す
    return string;
}

export {limittedContent}