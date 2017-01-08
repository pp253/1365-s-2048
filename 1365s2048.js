/*
 * 2014 copyright (c) by bigbigworld
 * start design at 2014.04.22
**/
document.ontouchmove = function(e) {e.preventDefault();}
// 除錯模式 bool
debug = false;
// 自動更新到最新版
latest = false;
latest_url = 'https://googledrive.com/host/0BxGSXV-9W1g6VnNZaEdjak1ZbG8/1365s2048_latest.html';

if (typeof(debug) == "undefined") debug = false;
if (typeof(latest) == "undefined") latest = true;
if (typeof(game_onfocus) == "undefined") game_onfocus = false;

if ( latest == true )
{
	if (location.href != latest_url )
	{
		location.assign(latest_url);
	}
}


de('[EVENT] 成功載入JS');

game_max = 19;

card_id = [
	'card_0',
	'card_1',
	'card_2',
	'card_3',
	'card_4',
	'card_5',
	'card_6',
	'card_7',
	'card_8',
	'card_9',
	'card_10',
	'card_11',
	'card_12',
	'card_13',
	'card_14',
	'card_15',
	'card_16',
	'card_17'
	];

card_number = [
	0,
	2,
	4,
	8,
	16,
	32,
	64,
	128,
	256,
	512,
	1024,
	2048,
	4096,
	8192,
	16384,
	32768,
	65536,
	131072];

game_inside_id = [
	'game_card_0',
	'game_card_1',
	'game_card_2',
	'game_card_3',
	'game_card_4',
	'game_card_5',
	'game_card_6',
	'game_card_7',
	'game_card_8',
	'game_card_9',
	'game_card_10',
	'game_card_11',
	'game_card_12',
	'game_card_13',
	'game_card_14',
	'game_card_15'
	];

card_table_id = [
	'card_table_1',
	'card_table_2',
	'card_table_3',
	'card_table_4',
	'card_table_5',
	'card_table_6',
	'card_table_7',
	'card_table_8',
	'card_table_9',
	'card_table_10',
	'card_table_11',
	'card_table_12',
	'card_table_13',
	'card_table_14',
	'card_table_15',
	'card_table_16',
	'card_table_17'];



de('[DEBUG] 開啟除錯模式');

// 隨機數函數 系列
// The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)
// See: http://www.msc.cornell.edu/~houle/javascript/randomizer.html
rnd.today = new Date();
rnd.seed = rnd.today.getTime();

function rnd ()
{
	rnd.seed = (rnd.seed*9301+49297) % 233280;
	return rnd.seed/(233280.0);
}

function random ( number )
{
	return Math.ceil(rnd()*number);
}




//写cookies函数 作者：翟振凯
//See: http://blog.csdn.net/zxmcl/article/details/1723595

//两个参数，一个是cookie的名子，一个是值
function set_cookie( name, value )
{
	var Days = 30; //此 cookie 将被保存 30 天
	var exp  = new Date();    //new Date("December 31, 9998");
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//取cookies函数
function get_cookie(name)
{
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null) return unescape(arr[2]); return null;
}

//删除cookie
function del_cookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}




// move game 函數
// 本部分完成後需要精簡程式碼
function move ( action_text, if_test )
{
	game_inside_value_after = new Array;
	if (typeof( if_test ) == "undefined") if_test = false;

	if ( if_test == false )
	{
		de ( '[EVENT] move(): 使用者輸入 ' + action_text + ' ，將進行一系列動作' );
	}
	else
	{
		de ( '[EVENT] move(): 測試 ' + action_text + ' ，將進行一系列動作' );
	}



	tmp = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]];

	switch ( action_text )
	{
		case 'left':
			for ( vi = 0 ; vi < 4 ; vi += 1 )
			{
				ti = 12 - 4 * vi;
				for ( ui = 0 ; ui < 4 ; ui += 1 )
				{
					tmp[vi][ui] = game_inside_value[ti];
					ti += 1;
				}
			}
			break;
		case 'up':
			for ( vi = 0 ; vi < 4 ; vi += 1 )
			{
				ti = vi;
				for ( ui = 0 ; ui < 4 ; ui += 1 )
				{
					tmp[vi][ui] = game_inside_value[ti];
					ti += 4;
				}
			}
			break;
		case 'right':
			for ( vi = 0 ; vi < 4 ; vi += 1 )
			{
				ti = 3 + 4 * vi;
				for ( ui = 0 ; ui < 4 ; ui += 1 )
				{
					tmp[vi][ui] = game_inside_value[ti];
					ti -= 1;
				}
			}
			break;
		case 'down':
			for ( vi = 0 ; vi < 4 ; vi += 1 )
			{
				ti = 15 - vi;
				for ( ui = 0 ; ui < 4 ; ui += 1 )
				{
					tmp[vi][ui] = game_inside_value[ti];
					ti -= 4;
				}
			}
			break;
		default:
			return false; break;
	};

	// 計算移動主程序
	for ( oi = 0; oi < 4 ; oi += 1 )
	{
		for ( wi = 1; wi < 4 ; wi += 1 )
		{
			if ( tmp[oi][wi] == 0 ) continue;

			for ( mi = 1 ; mi <= wi ; mi += 1 )
			{
				if ((tmp[oi][wi - mi] == 0) && ( wi != mi ))
				{
					// de ( '[DEBUG] move(): ========continue=======');
					continue;
				}

				if ((tmp[oi][wi - mi] == tmp[oi][wi]) && (tmp[oi][wi] != game_max))
				{
					tmp[oi][wi - mi] += 201;
					// de ( '[DEBUG] move(): if-1 tmp[' + oi + '][' + wi+ '] = ' + tmp[oi][wi] + ', mi = ' + mi);
					tmp[oi][wi] = 0;
				}
				else if (tmp[oi][wi - mi] != 0)
				{
					tmp[oi][wi - mi + 1] = tmp[oi][wi];
					// de ( '[DEBUG] move(): if-2 tmp[' + oi + '][' + wi+ '] = ' + tmp[oi][wi] + ', mi = ' + mi);
					if (mi != 1)
					{
						tmp[oi][wi] = 0;
					}
				}
				else
				{
					tmp[oi][wi - mi] = tmp[oi][wi];
					// de ( '[DEBUG] move(): else tmp[' + oi + '][' + wi+ '] = ' + tmp[oi][wi] + ', mi = ' + mi);
					tmp[oi][wi] = 0;
				}

				break;
			}
			// de ( '[DEBUG] move(): ---------next---------');
		}
		// de ( '[DEBUG] move(): ////////next_oi////////');
	}


	// 本部分演算概念李哲安有另一種方法 ~~~2014/04/23　（未採納）
	// 分兩步驟計算
	// (1) 先算加法
	// (2) 再算往前推

	switch ( action_text )
	{
		case 'left':
			for ( vi = 0 ; vi < 4 ; vi += 1 )
			{
				ti = 12 - 4 * vi;
				for ( ui = 0 ; ui < 4 ; ui += 1 )
				{
					if (tmp[vi][ui] >= 200)
					{
						game_inside_value_after[ti] = tmp[vi][ui] - 200;
						if ( if_test == false ) score_plus( tmp[vi][ui] - 200 );
					}
					else game_inside_value_after[ti] = tmp[vi][ui];
					ti += 1;
				}
			}
			break;
		case 'up':
			for ( vi = 0 ; vi < 4 ; vi += 1 )
			{
				ti = vi;
				for ( ui = 0 ; ui < 4 ; ui += 1 )
				{
					if (tmp[vi][ui] >= 200)
					{
						game_inside_value_after[ti] = tmp[vi][ui] - 200;
						if ( if_test == false ) score_plus( tmp[vi][ui] - 200 );
					}
					else game_inside_value_after[ti] = tmp[vi][ui];
					ti += 4;
				}
			}
			break;
		case 'right':
			for ( vi = 0 ; vi < 4 ; vi += 1 )
			{
				ti = 3 + 4 * vi;
				for ( ui = 0 ; ui < 4 ; ui += 1 )
				{
					if (tmp[vi][ui] >= 200)
					{
						game_inside_value_after[ti] = tmp[vi][ui] - 200;
						if ( if_test == false ) score_plus( tmp[vi][ui] - 200 );
					}
					else game_inside_value_after[ti] = tmp[vi][ui];
					ti -= 1;
				}
			}
			break;
		case 'down':
			for ( vi = 0 ; vi < 4 ; vi += 1 )
			{
				ti = 15 - vi;
				for ( ui = 0 ; ui < 4 ; ui += 1 )
				{
					if (tmp[vi][ui] >= 200)
					{
						game_inside_value_after[ti] = tmp[vi][ui] - 200;
						if ( if_test == false ) score_plus( tmp[vi][ui] - 200 );
					}
					else game_inside_value_after[ti] = tmp[vi][ui];
					ti -= 4;
				}
			}
			break;
		default:
			return false;
	};

	// de(game_inside_value);
	// de(game_inside_value_after);

	for ( ui = 0; ui < 16; ui += 1 )
	{
		if (game_inside_value[ui] != game_inside_value_after[ui])
		{
			if ( if_test == false ) game_inside_value = game_inside_value_after;
			return true;
		}
	}

	return false;
}





// 計算空格數
function count_space ()
{
	if (typeof( game_inside_value ) == "undefined")
	{
		de('[ERROR] game_inside_value == "undefined"');
		return false;
	};

	space_num = 0;
	for (gi = 0 ; gi < 16 ; gi += 1)
	{
		if (game_inside_value[gi] == 0)
		{
			space_num += 1;
		}
	}

	de('[DEBUG] count_space(): space_num = ' + space_num);

	return space_num;
}





// 隨機於空白處生成 [方塊2 or 4]
function random_brick ( num )
{
	space_num = count_space();

	if ( space_num )
	{
		de('[DEBUG] random_brick(): 將隨機生成 ' + num + ' 個[方塊2]');
	}
	else
	{
		de('[DEBUG] random_brick(): count_space() == false');
		return false;
	}

	for ( ri = 0 ; ri < num ; ri += 1)
	{
		space_0 = 0;
		space_random = random( space_num - ri );
		for ( gi = 0 ; gi < 16 ; gi += 1 )
		{
			if ( game_inside_value[gi] == 0 ) space_0 += 1;
			if ( space_0 == space_random )
			{
				if (random( 5 ) < 5)
				{
					game_inside_value[gi] = 1;
				}
				else
				{
					game_inside_value[gi] = 2;
				}
				space_0 += 1;
			}
		}
	}

	return true;
}



// 計分 加上去
function score_plus ( block )
{
	if ( golden_finger == false )
	{
		if (typeof(now_score) == "undefined") now_score = 0;
		if (typeof(best_score) == "undefined") best_score = 0;

		now_score += card_number[block] * 39.75;


		if (now_score > best_score)
		{
			best_score = now_score;
			set_cookie('best_score_cookie', best_score);
		}

		show_score( now_score, best_score );
		return true;
	}
	return false;
}


// 重置分數
function reset_score ()
{
	if (typeof(now_score) == "undefined") now_score = 0;

	now_score = 0;

	show_score( now_score, best_score );

	return true;
}


function show_score ( score, best_score_in )
{
	if (typeof(score) == "undefined") score = now_score;
	if (typeof(best_score_in) == "undefined") best_score_in = best_score;

	if (score < 10) $('p#nowScore').text('00000' + score);
	else if (score < 100) $('p#nowScore').text('0000' + score);
	else if (score < 1000) $('p#nowScore').text('000' + score);
	else if (score < 10000) $('p#nowScore').text('00' + score);
	else if (score < 100000) $('p#nowScore').text('0' + score);
	else $('p#nowScore').text( score);

	if (best_score_in < 10) $('span#bestScore').text('00000' + best_score_in);
	else if (best_score_in < 100) $('span#bestScore').text('0000' + best_score_in);
	else if (best_score_in < 1000) $('span#bestScore').text('000' + best_score_in);
	else if (best_score_in < 10000) $('span#bestScore').text('00' + best_score_in);
	else if (best_score_in < 100000) $('span#bestScore').text('0' + best_score_in);
	else $('span#bestScore').text( best_score_in);

	return true;
}


// 將結果呈現到 HTML
function put_result ()
{
	for ( gi = 0 ; gi < 16 ; gi += 1 )
	{
		$('div#' + game_inside_id[gi]).attr('class', card_id[game_inside_value[gi]]);
		if ( card_number[game_inside_value[gi]] != 0 )
		{
			$('div#' + game_inside_id[gi]).html('<p>' + card_number[game_inside_value[gi]] + '</p>');
		}
		else
		{
			$('div#' + game_inside_id[gi]).html('');
		}
	}

	return true;
}



function card_already_have_max_if ( start_cookie )
{
	if (typeof(start_cookie) == "undefined") var start_cookie = false;
	if (typeof(card_already_have_max) == "undefined") card_already_have_max = 0;
	var card_already_have_max_before = card_already_have_max;

	if (typeof(card_already_have_max_this_time) == "undefined") card_already_have_max_this_time = 0;

	for ( var mi = 0; mi < 16; mi += 1)
	{
		if ( game_inside_value[mi] > card_already_have_max)
		{
			card_already_have_max = game_inside_value[mi];
			set_cookie('card_already_have_max_cookie', card_already_have_max);
			// de(card_already_have_max);
			show_content(card_already_have_max);
		}

		if ( game_inside_value[mi] > card_already_have_max_this_time)
		{
			card_already_have_max_this_time = game_inside_value[mi];
			$('div#game_card_best').attr('class', card_id[card_already_have_max_this_time]);
			$('div#game_card_best').html('<p>' + card_number[card_already_have_max_this_time] + '</p>');
		}
	}

	if ( start_cookie == true )
	{
		// de(card_already_have_max);
		for ( var ni = 1; ni <= card_already_have_max; ni += 1 )
		{
			$('div#' + card_id[ni]).addClass('have');
			$('div#' + card_table_id[ni - 1]).addClass('have');
		}
		show_content(card_already_have_max);
	}
	else if ( card_already_have_max_before == card_already_have_max )
	{
		return false;
	}
	else
	{
		for ( var ri = 1; ri <= card_already_have_max; ri += 1 )
		{
			$('div#' + card_id[ri]).addClass('have');
			$('div#' + card_table_id[ri - 1]).addClass('have');
		}

		if ( card_already_have_max < 6 ) return false;
		else return true;
	}
}




// 顯示卡片
function show_card ( action, card_id_or_more )
{
	if (typeof(action) == "undefined") action = false;
	if (typeof(card_id_or_more) == "undefined") card_id_or_more = 1;

	if (typeof(card_already_have_max) == "undefined") card_already_have_max = 0;
	if (typeof(card_viewing) == "undefined") card_viewing = 1;
	
	switch (action)
	{
		case 'left':
			if (card_viewing > 1)
			{
				$('div#card_content_right').attr('hidden', false);
				$('div#card_content_' + card_viewing).removeClass('select');
				$('div#card_table_' + card_viewing).removeClass('select');

				game_onfocus = false;
				card_viewing -= 1;

				$('div#card_content').attr('style', 'margin-left: -' + ( 500 * (card_viewing - 1) ) + 'px');
				$('div#card_content_' + card_viewing).addClass('select');
				$('div#card_table_' + card_viewing).addClass('select');
				if (card_viewing == 1) $('div#card_content_left').attr('hidden', true);
				return true;
			}
			return false;
			break;
		case 'right':
			if (card_viewing < 17)
			{
				game_onfocus = false;
				$('div#card_content_left').attr('hidden', false);
				$('div#card_content_' + card_viewing).removeClass('select');
				$('div#card_table_' + card_viewing).removeClass('select');

				card_viewing += 1;

				$('div#card_content').attr('style', 'margin-left: -' + ( 500 * (card_viewing - 1) ) + 'px');
				$('div#card_content_' + card_viewing).addClass('select');
				$('div#card_table_' + card_viewing).addClass('select');
				if (card_viewing == 17) $('div#card_content_right').attr('hidden', true);
				return true;
			}
			return false;
			break;
		case 'move_to':
			if (card_viewing >= 1 && card_viewing <= 17)
			{
				game_onfocus = false;
				$('div#card_content_' + card_viewing).removeClass('select');
				$('div#card_table_' + card_viewing).removeClass('select');

				card_viewing = card_id_or_more;

				$('div#card_content').attr('style', 'margin-left: -' + ( 500 * (card_viewing - 1) ) + 'px');
				$('div#card_content_' + card_viewing).addClass('select');
				$('div#card_table_' + card_viewing).addClass('select');

				if (card_viewing == 1)
				{
					$('div#card_content_right').attr('hidden', false);
					$('div#card_content_left').attr('hidden', true);
				}
				else if (card_viewing == 17)
				{
					$('div#card_content_right').attr('hidden', true);
					$('div#card_content_left').attr('hidden', false);
				}
				else
				{
					$('div#card_content_right').attr('hidden', false);
					$('div#card_content_left').attr('hidden', false);
				}
				return true;
			}
			return false;
			break;
		case 'auto':
			if ( card_already_have_max_if() )
			{
				game_onfocus = false;
				$('div#popup_card').addClass('onfocus');
				$('body').addClass('unfocus_on_game');
				show_card( 'move_to', card_already_have_max );
			}
			return false;
			break;
		default: return false; break;
	}
}


// 初始化函數
// 須包含初始化遊戲、計算最高分、分數歸零。
function start ()
{
	golden_finger = false;
	
	// 初始化遊戲陣列
	game_inside_value = new Array();
	card_already_have_max_this_time = 0;

	for (gi = 0 ; gi < 16 ; gi += 1)
	{
		game_inside_value[gi] = 0;
	}

	de('[EVENT] 初始化遊戲資料陣列完成');

	random_brick(3);
	put_result();

	card_already_have_max = get_cookie('card_already_have_max_cookie');
	if ( card_already_have_max == null ) card_already_have_max = 0;
	// de(card_already_have_max);
	card_already_have_max_if( true );


	best_score = get_cookie('best_score_cookie');

	if ( best_score == null ) best_score = 0;
	show_score(0, best_score);
	
/*
	// have BUG 150725 pp253
	switch ( user_agent[0] )
	{
		case 'Firefox':
			$('div#main').removeClass('welcome');
			$('body').removeClass('unfocus_on_game');
			break;
		case 'MSIE':
			$('div#main').removeClass('welcome');
			$('body').removeClass('unfocus_on_game');
			break;
		default:
			break;
	}
*/
	return true;
}


// 重新開始
function restart ()
{
	golden_finger = false;
	
	game_onfocus = true;
	if (typeof(game_inside_value) == "undefined") game_inside_value = new Array();

	card_already_have_max_this_time = 0;

	for (gi = 0 ; gi < 16 ; gi += 1)
	{
		game_inside_value[gi] = 0;
	}

	de('[EVENT] 重新初始化遊戲資料陣列完成');

	random_brick(3);
	put_result();

	reset_score();

	return true;
}


// 檢測是否已死亡
function if_die ()
{
	if (move( 'left', true ) == false && move( 'right', true ) == false && move( 'down', true ) == false && move( 'up', true ) == false) return true;

	return false;
}


// 調整大小等
function resize ()
{
	$('div#card_content_left').attr('style', 'left: ' + (document.documentElement.clientWidth / 2 - 310) + 'px;');
	$('div#card_content_right').attr('style', 'left: ' + (document.documentElement.clientWidth / 2 + 260) + 'px;');
	$('div.card_content_inside').attr('style', 'padding-left: ' + (document.documentElement.clientWidth / 2 - 250) + 'px; padding-right: ' + (document.documentElement.clientWidth / 2 - 250) + 'px;');
}



// 設定卡片內容
function show_content ( max ){
	
	if ( typeof(max) == "undefined" ) max = 2;
	
	content = 
		['','','',
		'<div class="pic card_3"></div><h1>海</h1><p>海：助詞；無義。</p><p>例句一：怎麼遲到囉？海。</p><p>例句二：睡囉！海。</p><p>維基釋義：<br />海又被稱為「大海」，是指與「大洋」相連接的大面積鹹水區域，通常大型內陸鹽湖、沒有與海洋連通的大型鹹水湖泊如裏海、加利利海是「海」。海分為邊緣海、內海、內陸海（廣大的淡水水系，如五大湖）和陸間海。</p><p class="pic_from">圖片來源： <a href="http://ezgo.coa.gov.tw/graph/spots/X_x0003_20040528111305/X_x0003_20040528111305_general_000004s2.jpg">http://ezgo.coa.gov.tw/</a><br />資料來源： <a href="http://zh.wikipedia.org/wiki/%E6%B5%B7">海 - 維基百科，自由的百科全書</a></p>',
		'<div class="pic card_4"></div><h1>海蛤</h1><p>「海」的引進者。</p><p>腹水腫肛，四肢枯瘦。用海蛤（煅成粉）、防己各七錢半，葶藶、赤茯苓、桑白皮各一兩，陳桔皮、隨李仁各半兩，共研為末，加蜜做成丸子，如梧子大。每服五十丸，米湯送下。一天服二次。此方名“ 海蛤丸 ”。</p><p class="pic_from">圖片來源： Google Search 圖片搜尋預覽<br />資料來源： <a href="http://baike.baidu.com/view/252125.htm">海蛤_百度百科</a></p>',
		'<div class="pic card_5"></div><h1>蝦蝦</h1><p>蝦，是一種生活在水中的長身動物，屬節肢動物甲殼類，種類很多，包括葉政勳、青蝦、河蝦、草蝦、小龍蝦、對蝦、明蝦、基圍蝦、琵琶蝦、龍蝦等。</p><p class="pic_from">圖片來源： 到處都是蝦，無法查明<br />資料來源： <a href="http://zh.wikipedia.org/wiki/%E8%99%BE">蝦 - 維基百科，自由的百科全書</a></p>',
		'<div class="pic card_6"></div><h1>DB2</h1><p>DB2是IBM的資料庫系統。<br />～～某鄉民表示</p><p>請統神去當TPS教練 指導這些DB2們吧<br />～～某鄉民表示</p><p>DB2是無辜的  Db2是無辜的<br />～～某鄉民表示</p><p>跟本班某位既DB又底逼的蔡姓同學長的神似<br />～～1365表示</p><p class="pic_from">圖片來源： 物理課本封面阿<br />資料來源： <a href="http://www.ptt.cc/bbs/LoL/M.1389666888.A.B74.html">[公告] 六人水桶公告 - 看板 LoL - 批踢踢實業坊</a></p>',
		'<div class="pic card_7"></div><h1>恆睿怪鳥</h1><p>恆睿怪鳥。聽說這是自畫像。</p><img class="right" src="img/128_strange_bird.jpg" width="333" height="370" alt="恆瑞怪鳥"></a><p class="pic_from">圖片來源： 莊恆睿手繪</p>',
		'<div class="pic card_8"></div><h1>巨人</h1><p>高一上時，大家為了班級布置比賽，而製作的巨人頭像。</p><p class="pic_from">圖片來源： bigbigworld</p><img src="img/256_class_1.JPG" width="448" height="335" alt="IMG_0798"><img src="img/256_class_2.JPG" width="336" height="448" alt="IMG_0886"><img src="img/256_class_3.JPG" width="335" height="448" alt="IMG_0898"><img src="img/256_class_4.JPG" width="335" height="448" alt="IMG_0899"><img src="img/256_class_5.JPG" width="335" height="448" alt="IMG_0900"><img src="img/256_class_6.JPG" width="335" height="448" alt="IMG_0901"><img src="img/256_class_7.JPG" width="335" height="448" alt="IMG_0902"><img src="img/256_class_8.JPG" width="335" height="448" alt="IMG_0903"><img src="img/256_class_9.JPG" width="335" height="448" alt="IMG_0904"><img src="img/256_class_10.JPG" width="335" height="448" alt="IMG_0905">',
		'<div class="pic card_9"></div><h1>翰林爆笑</h1><p>高一下時，1365 班級代表 翰林 擔綱該屆校慶晚會主持人之一。演技一流，超級綜藝，此圖為證。</p><p class="pic_from">截圖自： <a href="https://www.youtube.com/watch?v=79NjmbPhIMs">師大附中67屆校慶 創意隊呼第一名 1365</a></p><iframe width="480" height="270" src="https://www.youtube.com/embed/79NjmbPhIMs" frameborder="0" allowfullscreen style="padding-left:11px;"></iframe>',
		'<div class="pic card_10"></div><h1>1365 愛國歌曲比賽 第四名</h1><p>高一上時，1365 班以「我是金城武」和「反攻大陸」等幽默口號另類的威攝了全場。<br />正所謂霸氣側漏。</p><p class="pic_from">截圖自： <a href="https://www.youtube.com/watch?v=i8NtfQPttB8">附中愛國歌曲比賽 1365班</a></p><iframe width="480" height="270" src="https://www.youtube.com/embed/i8NtfQPttB8" frameborder="0" allowfullscreen style="padding-left:11px;"></iframe>',
		'<div class="pic card_11"></div><h1>1365 創意隊呼比賽 第一名</h1><p>高一下時，我記得，主持人在公布名次時是這樣說的：「剛剛那個有點可愛，有點娘的班級，用最活潑，有朝氣的動作，為大家的青春增添不一樣的色彩。第一名－1365！！」<br />很明顯的我剛剛有一些是用掰的。。</p><p class="pic_from">截圖自： <a href="https://www.youtube.com/watch?v=JDLxruWOHnU">附中1365創意隊呼得第一</a></p><iframe width="480" height="270" src="https://www.youtube.com/embed/JDLxruWOHnU" frameborder="0" allowfullscreen style="padding-left:11px;"></iframe>',
		'<div class="pic card_12"></div><h1>白千芸老師<span style="font-size: 40%;">（<b style="text-decoration: underline;">自稱</b>附中瑤瑤）</span></h1><p>師大附中 公民與社會科 專任老師。</p><p>潔錚老師以生動活潑有趣的教學方式聞名，並輔以具有意義的校外教學，使學生得以成為一個真正具備公民素養的優質公民。備受學生愛戴（吧）。</p><p>上課時常自稱附中瑤瑤，並有個超級綜藝的夢想。</p><p class="pic_from">圖片來源： facebook</p>',
		'<div class="pic card_13"></div><h1>陳玲玲老師</h1><p>師大附中 國文科老師、1365班的老大。</p><p>玲玲老師統帥 1365 全班。是 1365 的老大。</p><p class="pic_from">圖片來源： facebook</p>',
		'<div class="pic card_14"></div><h1>師大附中</h1><p>師大附中 校歌</p><iframe width="480" height="270" src="https://www.youtube.com/embed/t6odi7JxTHs" frameborder="0" allowfullscreen></iframe><p>附中　附中　我們的搖籃<br>漫天烽火　創建在台灣<br>玉山給我們靈秀雄奇<br>東海使我們闊大開展<br>我們來自四方　融匯了各地的優點<br>我們親愛精誠師生結成了一片<br>砥礪學行　鍛鍊體魄<br>我們是新中國的中堅<br>看我們附中培育的英才<br>肩負起時代的重擔<br>附中青年　決不怕艱難<br>復興中華　相期在明天<br>把附中精神　照耀祖國的錦繡河山</p><p class="pic_from">圖片來源： <a href="http://zh.wikipedia.org/wiki/%E5%9C%8B%E7%AB%8B%E8%87%BA%E7%81%A3%E5%B8%AB%E7%AF%84%E5%A4%A7%E5%AD%B8%E9%99%84%E5%B1%AC%E9%AB%98%E7%B4%9A%E4%B8%AD%E5%AD%B8">國立臺灣師範大學附屬高級中學 - 維基百科，自由的百科全書</a><br />資料來源： <a href="http://www.hs.ntnu.edu.tw/great/school_song/">附中校歌 | 國立臺灣師範大學附屬高級中學</a></p>',
		'<div class="pic card_15"></div><h1>握手</h1><p>威力太強大了，就不說了。</p><p class="pic_from">圖片來源： 梁世霖 + bigbigworld 的手</p>',
		'<div class="pic card_16"></div><h1>台灣</h1><p>臺灣是位於亞洲東部、太平洋西北側的島嶼，另有寶島、鯤島、福爾摩沙等別稱。地處琉球群島與菲律賓群島之間，西隔臺灣海峽與歐亞大陸相望；面積約3.6萬平方公里，其中7成為山地與丘陵，平原則主要集中於西部沿海，地形海拔變化大。</p><p class="pic_from">圖片來源： 忘了<br />資料來源： <a href="http://zh.wikipedia.org/wiki/%E8%87%BA%E7%81%A3">臺灣 - 維基百科，自由的百科全書</a></p>',
		'<div class="pic card_17"></div><h1>聯合國</h1><p>聯合國（英文縮寫：UN）是一個由主權國家組成的國際組織，致力於促進各國在國際法、國際安全、經濟發展、社會進步、人權、公民自由、政治自由、民主及實現持久世界和平方面的合作。聯合國成立於第二次世界大戰結束後的1945年，用以取代國際聯盟，去阻止戰爭並為各國提供對話平臺。聯合國下設了許多附屬機構以實現其宗旨。</p><p class="pic_from">圖片來源： <a href="http://zh.wikipedia.org/wiki/File:Flag_of_the_United_Nations.svg">http://zh.wikipedia.org</a><br />資料來源： <a href="http://zh.wikipedia.org/wiki/%E8%81%94%E5%90%88%E5%9B%BD">聯合國 - 維基百科，自由的百科全書</a></p>']
	
	
	for ( var mi = 3; mi <= max; mi += 1 )
	{
		$('div#card_content_inside_' + mi).removeClass('have_not');
		$('div#card_content_inside_' + mi).html(content[mi]);
	}
	
	return true;
}




// 除錯模式 紀錄顯示 函數
function de ( str )
{
	if (debug == true) console.log( str );
	return true;
}

// 輸出全盤數值
function de_game ()
{
	str = '';
	for( gi = 0 ; gi < 16 ; gi += 1 )
	{
		str += game_inside_value[gi] + ' ';
		if ( gi % 4 == 3 ) str += "\n";
	}

	// str += '陣列順序：左上角是[0]，往右數，再往下數。所以右上是[3]，左下是[12]，右下是[15]。\n';
	// str += '數字代表：陣列中的數字代表是第幾張卡。';
	de ( str );

	return true;
}

// 測試全部方塊
function de_testall ( page )
{
	if ( typeof(page) == "undefined" ) page = 1;

	switch ( page )
	{
		case 1:
			for ( bi = 0, ti = 1 ; bi < 16 ; bi += 1, ti += 1 )
			{
				game_inside_value[bi] = ti;
			}
			put_result();
			return true;
		case 2:
			for ( bi = 0 ; bi < 16 ; bi += 1 )
			{
				game_inside_value[bi] = 17;
			}
			put_result();
			return true;
		case 3:
			for ( bi = 0 ; bi < 16 ; bi += 1 )
			{
				game_inside_value[bi] = 13;
			}
			put_result();
			return true;
		default: return false;
	}
}




// See: http://www.muzilei.com/archives/142
//调用函数，返回一个数组,r[0]是浏览器名称，r[1]是版本号
function browser_agent ()
{
	var ua=window.navigator.userAgent,
		ret="";

	if(/Firefox/g.test(ua))
	{
		ua=ua.split(" ");
		ret="Firefox|"+ua[ua.length-1].split("/")[1];
	}
	else if(/MSIE/g.test(ua))
	{
		ua=ua.split(";");
		ret="IE|"+ua[1].split(" ")[2];
	}
	else if(/Opera/g.test(ua))
	{
		ua=ua.split(" ");
		ret="Opera|"+ua[ua.length-1].split("/")[1];
	}
	else if(/Chrome/g.test(ua))
	{
		ua=ua.split(" ");
		ret="Chrome|"+ua[ua.length-2].split("/")[1];
	}
	else if(/^apple\s+/i.test(navigator.vendor))
	{
		ua=ua.split(" ");
		ret="Safair|"+ua[ua.length-2].split("/")[1];
	}
	else
	{
		ret="未知的";
	}

	return ret.split("|");
}

user_agent = browser_agent();



function full_move ( direction )
{
	if ( typeof(direction) == "undefined" ) return false;
	
	if ( game_onfocus == false ) return false;
	switch ( direction )
	{
		case 'left':
			if (move('left') == true){
				random_brick(1);
				put_result();
				show_card( 'auto' );
			};
			break;
		case 'up':
			if (move('up') == true){
				random_brick(1);
				put_result();
				show_card( 'auto' );
			};
			break;
		case 'right':
			if (move('right') == true){
				random_brick(1);
				put_result();
				show_card( 'auto' );
			};
			break;
		case 'down':
			if (move('down') == true){
				random_brick(1);
				put_result();
				show_card( 'auto' );
			};
			break;
		default:
			return false;
	}
	
	if ( if_die() == true )
	{
		de('[EVENT] 玩家死亡。分數：' + now_score);
		$('div#popup_die').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
	}
	
	return true;
}



$(document).ready(function()
{
	de('[EVENT] 頁面載入完成');

	resize();

	$(window).resize(function(){ resize(); });

	start();

	$(document).keydown(function(keydown_event)
	{
		// de('[DEBUG] 現在輸入的鍵位序號: ' + keydown_event.which);
		/**
		 * 鍵位序號
		 * left		37
		 * up		38
		 * right	39
		 * down		40
		 */
		if (game_onfocus == true )
		{
			switch( keydown_event.which )
			{
				case 37:
					full_move('left');
					break;
				case 38:
					full_move('up');
					break;
				case 39:
					full_move('right');
					break;
				case 40:
					full_move('down');
					break;
				case 76:
					$(document).keydown(function(keydown_event)
					{
						if (keydown_event.which == 73){
							$(document).keydown(function(keydown_event)
							{
							if (keydown_event.which == 78){
								$(document).keydown(function(keydown_event)
								{
								if (keydown_event.which == 76){
									$(document).keydown(function(keydown_event)
									{
									if (keydown_event.which == 73){
										$(document).keydown(function(keydown_event)
										{
										if (keydown_event.which == 78){
											$(document).keydown(function(keydown_event)
											{
											if (keydown_event.which == 13){
												golden_finger = true;
												de_testall(3);
											}
											});
										}
										});
									}
									});
								}
								});
							}
							});
						}
					});
					break;
				default: break;
			};
		};
	});

	
	
	$$('div.game').swipeLeft(function(){ full_move('left'); });
	$$('div.game').swipeRight(function(){ full_move('right'); });
	$$('div.game').swipeUp(function(){ full_move('up'); });
	$$('div.game').swipeDown(function(){ full_move('down'); });
	



	$('div#game_content_left').click(function() {full_move('left'); });
	$('div#game_content_right').click(function() {full_move('right'); });
	$('div#game_content_up').click(function() {full_move('up'); });
	$('div#game_content_down').click(function() {full_move('down'); });
	
	$('div#restart_and_close').click(function()
	{
		restart();
		$('div#popup_die').removeClass('onfocus');
		$('body').removeClass('unfocus_on_game');
		game_onfocus = true;
	});


	$('div#restart').click(function(){ 
		
		$('div#popup_retry_doublecheck').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		game_onfocus = false;
		//restart();
	});

	$('div#popup_retry_yes').click(function(){ 
		
		restart();
		$('div#popup_retry_doublecheck').removeClass('onfocus');
		$('body').removeClass('unfocus_on_game');
		game_onfocus = true;
	});

	$('div#popup_retry_no').click(function(){ 
		
		$('div#popup_retry_doublecheck').removeClass('onfocus');
		$('body').removeClass('unfocus_on_game');
		game_onfocus = true;
	});



	$('div#about_this_game').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_about').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		game_onfocus = false;
	});

	$('div#popup_about_ok').click(function()
	{
		document.ontouchmove = function(e) {e.preventDefault();}
		$('div#popup_about').removeClass('onfocus');
		$('div#popup_help').removeClass('onfocus');
		$('div#main').removeClass('welcome');
		$('body').removeClass('unfocus_on_game');
		game_onfocus = true;
	});


	$('div#help').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_help').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		game_onfocus = false;
	});


	// #popup_card
	$('div#card_table_bye').click(function()
	{
		document.ontouchmove = function(e) {e.preventDefault();}
		$('div#popup_card').removeClass('onfocus');
		$('body').removeClass('unfocus_on_game');
		game_onfocus = true;
		de('dtydt');
	});



	// .main.card_inside
	$('div#card_1').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_card').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		show_card( 'move_to', 1 );
	});
	$('div#card_2').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_card').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		show_card( 'move_to', 2 );
	});
	$('div#card_3').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_card').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		show_card( 'move_to', 3 );
	});
	$('div#card_4').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_card').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		show_card( 'move_to', 4 );
	});
	$('div#card_5').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_card').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		show_card( 'move_to', 5 );
	});
	$('div#card_6').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_card').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		show_card( 'move_to', 6 );
	});
	$('div#card_7').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_card').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		show_card( 'move_to', 7 );
	});
	$('div#card_8').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_card').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		show_card( 'move_to', 8 );
	});
	$('div#card_9').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_card').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		show_card( 'move_to', 9 );
	});
	$('div#card_10').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_card').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		show_card( 'move_to', 10 );
	});
	$('div#card_11').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_card').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		show_card( 'move_to', 11 );
	});
	$('div#card_12').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_card').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		show_card( 'move_to', 12 );
	});
	$('div#card_13').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_card').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		show_card( 'move_to', 13 );
	});
	$('div#card_14').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_card').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		show_card( 'move_to', 14 );
	});
	$('div#card_15').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_card').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		show_card( 'move_to', 15 );
	});
	$('div#card_16').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_card').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		show_card( 'move_to', 16 );
	});
	$('div#card_17').click(function()
	{
		document.ontouchmove = function(e) {}
		$('div#popup_card').addClass('onfocus');
		$('body').addClass('unfocus_on_game');
		show_card( 'move_to', 17 );
	});




	$('div#card_content_left').click(function(){ show_card( 'left' ); });

	$('div#card_content_right').click(function(){ show_card( 'right' ); });

	$('div#card_table_1').click(function(){ show_card( 'move_to', 1 ); });
	$('div#card_table_2').click(function(){ show_card( 'move_to', 2 ); });
	$('div#card_table_3').click(function(){ show_card( 'move_to', 3 ); });
	$('div#card_table_4').click(function(){ show_card( 'move_to', 4 ); });
	$('div#card_table_5').click(function(){ show_card( 'move_to', 5 ); });
	$('div#card_table_6').click(function(){ show_card( 'move_to', 6 ); });
	$('div#card_table_7').click(function(){ show_card( 'move_to', 7 ); });
	$('div#card_table_8').click(function(){ show_card( 'move_to', 8 ); });
	$('div#card_table_9').click(function(){ show_card( 'move_to', 9 ); });
	$('div#card_table_10').click(function(){ show_card( 'move_to', 10 ); });
	$('div#card_table_11').click(function(){ show_card( 'move_to', 11 ); });
	$('div#card_table_12').click(function(){ show_card( 'move_to', 12 ); });
	$('div#card_table_13').click(function(){ show_card( 'move_to', 13 ); });
	$('div#card_table_14').click(function(){ show_card( 'move_to', 14 ); });
	$('div#card_table_15').click(function(){ show_card( 'move_to', 15 ); });
	$('div#card_table_16').click(function(){ show_card( 'move_to', 16 ); });
	$('div#card_table_17').click(function(){ show_card( 'move_to', 17 ); });



});



