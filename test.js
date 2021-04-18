const cheerio = require('cheerio');
const data = "<h1 id=\"h3869d07463\"><strong style=\"color:#569cd6\"># dafiとは</strong></h1><p>defiではなくdafiです。決まった量のトークンを供給するのではなくネットワークの状態によって供給量を調整できるdefiです。<br><br>公式:https:&#x2F;&#x2F;www.dafiprotocol.io&#x2F;#</p><h1 id=\"h032230c71e\"><strong style=\"color:#569cd6\">今回のイベントの概要</strong></h1><p>全体の上限 : 12500USD<br>個人上限 : 100USD<br>締め切り:3&#x2F;15 (17pm UTC)<br>当選結果通知:3&#x2F;16<br></p><h1 id=\"h36fd50d963\"><strong style=\"color:#569cd6\">参加方法</strong></h1><p>以下のステップで15分ほどで完了します<br><br><span style=\"color:#6796e6\">1.</span> ツイッターのフォロー<br><span style=\"color:#6796e6\">2.</span> リツート<br><span style=\"color:#6796e6\">3.</span> テレグラムの参加<br><span style=\"color:#6796e6\">4.</span> DaoMakerのアカウント登録<br><span style=\"color:#6796e6\">5.</span> Googleフォームの入力<br><span style=\"color:#6796e6\">6.</span> 3&#x2F;16 当選結果の確認<br></p><h2 id=\"hdde526e51e\"><strong style=\"color:#569cd6\">ツイッターのフォロー</strong></h2><p>下記のアカウントをフォローしてください<br>https:&#x2F;&#x2F;twitter.com&#x2F;DafiProtocol<br>https:&#x2F;&#x2F;twitter.com&#x2F;TheDaoMaker<br></p><h2 id=\"h0c81f98ebe\"><strong style=\"color:#569cd6\">リツイート</strong></h2><p>https:&#x2F;&#x2F;twitter.com&#x2F;dafiprotocol&#x2F;status&#x2F;1367870068298821633?s=21<br>上のツイートを相互フォローしている人2人に $DAFI #SHOのタグをつけてリツイートしてください<br><br>参考:https:&#x2F;&#x2F;twitter.com&#x2F;crypttech1&#x2F;status&#x2F;1370592578161180675<br></p><h2 id=\"ha7c61295b2\"><strong style=\"color:#569cd6\">テレグラムの参加</strong></h2><p>下記のチャンネルに参加してください<br>https:&#x2F;&#x2F;t.me&#x2F;DafiProtocol<br>https:&#x2F;&#x2F;t.me&#x2F;DafiAnnouncement<br></p><h2 id=\"h6bd7a85a9d\"><strong style=\"color:#569cd6\">DaoMakerのアカウント登録</strong></h2><p>DaoMakerのアカウントに登録してください<br>https:&#x2F;&#x2F;socialmining.daomaker.com&#x2F;<br></p><h2 id=\"ha90bd74e08\"><strong style=\"color:#569cd6\">Googleフォームの入力</strong></h2><p>下記のフォームを埋めましょう<br>https:&#x2F;&#x2F;forms.gle&#x2F;mAV7WR2r2oDtnXHaA<br></p><h2 id=\"h9f78a814fe\"><strong style=\"color:#569cd6\">当選結果の確認後</strong></h2><p>当選した場合はすぐにkycを行いUSDCを送ってください(200人が当選し125人しか買えないようになっているので早い者勝ちのようです)<br></p><h2 id=\"h3de35099b3\"><strong style=\"color:#569cd6\">参考</strong></h2><p>ホワイトリストについて:https:&#x2F;&#x2F;dafiprotocol.medium.com&#x2F;whitelisting-steps-dafi-bce00d1593b7<br><br>SHOについて（こちらの方が詳しく書いてあります）： https:&#x2F;&#x2F;medium.com&#x2F;daomaker&#x2F;dafi-protocol-sho-guidelines-c69e06a1e42c<br></p>"
const $ = cheerio.load(data);
const headings = $('h1, h2, h3').toArray();

// console.log(headings);
const toc = headings.map((d) => {
  // console.log(d.children[0].children[0].data)
  return {
    text: d.children[0].children[0].data,
    id: d.attribs.id,
    name: d.name,
  };
});
console.log(toc)
// $('.heading').text('Bar');
// $('.heading').addClass('red');

// const result = $.html();
// console.log(result);