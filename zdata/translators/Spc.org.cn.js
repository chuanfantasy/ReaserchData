{
	"translatorID": "3cf79f02-f4af-4392-8b84-26c2bdae2607",
	"label": "Spc.org.cn",
	"creator": "018<lyb018@gmail.com>",
	"target": "https?://www\\.spc\\.org\\.cn/online",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2022-10-18 13:34:59"
}

/*
	***** BEGIN LICENSE BLOCK *****

	Copyright © 2020 018<lyb018@gmail.com>

	This file is part of Zotero.

	Zotero is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Zotero is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with Zotero. If not, see <http://www.gnu.org/licenses/>.

	***** END LICENSE BLOCK *****
*/

// eslint-disable-next-line
function attr(docOrElem,selector,attr,index){var elem=index?docOrElem.querySelectorAll(selector).item(index):docOrElem.querySelector(selector);return elem?elem.getAttribute(attr):null;}function text(docOrElem,selector,index){var elem=index?docOrElem.querySelectorAll(selector).item(index):docOrElem.querySelector(selector);return elem?elem.textContent:null;}function trim(content){return content.replace(/^[\xA0\s]+/gm, '').replace(/[\xA0\s]+$/gm, '').replace(/\n+/g, '\n').replace(/:\n+/g, ': ').replace(/]\n/g, ']').replace(/】\n/g, '】').replace(/\n\/\n/g, '/')}

function detectWeb(_doc, _url) {
	return 'report';
}

function doWeb(doc, url) {
	scrapeSpc(doc, url);
}

function scrapeSpc(doc, url) {
	if (!url || url.length <= 0) {
		return;
	}

	var itemType = detectWeb(doc, url);
	var item = new Zotero.Item(itemType);

	item.language = 'zh-CN';
	item.url = url;
	item.libraryCatalog = '中国标准在线服务网';
	item.extra = "Type: standard";

	var ps = doc.querySelectorAll('ul.detailedinfo-content-collapse > li p');

	for (var p of ps) {
		var tdTitle = p.textContent.replace('：', '').trim();
		if (!p.nextElementSibling) {
			continue;
		}

		var tdContent = p.nextElementSibling.textContent.trim();
		if (tdContent.length === 0) {
			continue;
		}

		switch (tdTitle) {
			case '标准号':
				if (tdContent.startsWith('GB')) {
					// 国标编号使用一字线
					tdContent = tdContent.replace('-', '—');
				}
				item.reportNumber = tdContent;
				break;
			case '标准名称':
				item.title = tdContent;
				break;
			case '出版语种':
				if (tdContent === 'EN') {
					item.language = 'en';
				}
				break;
			case '发布日期':
				if (tdContent.length > 0) {
					item.date = tdContent;
				}
				break;
			case '归口单位':
				for (var c of tdContent.split('、')) {
					c = c.replace('(SAC/TC 4)', '');
					if (c.startsWith('ISO/')) {
						c = 'ISO';
					}
					item.creators.push({
						lastName: c,
						creatorType: 'author',
						fieldMode: 1
					});
				}
				break;
			default:
				break;
		}
	}
	item.abstractNote = doc.querySelector('.stand-detail-description').textContent.replace(/标准简介|文前页下载| |\n|\t|/g, '')
		.replace('读者对象：', '\n读者对象：')
		.replace('适用范围：暂无', '');
	item.attachments.push({
		title: 'Snapshot',
		document: doc
	});

	item.complete();
}


/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://www.spc.org.cn/online/75a5d85b40a9a7c6a780bdb4e3c554e7.html",
		"items": [
			{
				"itemType": "report",
				"title": "信息与文献　参考文献著录规则",
				"creators": [
					{
						"lastName": "全国信息与文献标准化技术委员会",
						"creatorType": "author",
						"fieldMode": 1
					}
				],
				"date": "2015-05-15",
				"abstractNote": "适用范围：本标准规定了各个学科、各种类型信息资源的参考文献的著录项目、著录顺序、著录用符号、著录用文字、各个著录项目的著录方法以及参考文献在正文中的标注法。本标准适用于著者和编辑著录参考文献，而不是供图书馆员、文献目录编制者以及索引编辑者使用的文献著录规则。",
				"extra": "Type: standard",
				"language": "zh-CN",
				"libraryCatalog": "中国标准在线服务网",
				"reportNumber": "GB/T 7714—2015",
				"url": "https://www.spc.org.cn/online/75a5d85b40a9a7c6a780bdb4e3c554e7.html",
				"attachments": [
					{
						"title": "Snapshot",
						"mimeType": "text/html"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://www.spc.org.cn/online/dbbd00948cf962988f33ddc307327a60.html",
		"items": [
			{
				"itemType": "report",
				"title": "Information and documentation — Guidelines for bibliographic references and citations to information resources",
				"creators": [
					{
						"lastName": "ISO",
						"creatorType": "author",
						"fieldMode": 1
					}
				],
				"date": "2021-06-11",
				"extra": "Type: standard",
				"language": "en",
				"libraryCatalog": "中国标准在线服务网",
				"reportNumber": "ISO 690:2021 EN",
				"url": "https://www.spc.org.cn/online/dbbd00948cf962988f33ddc307327a60.html",
				"attachments": [
					{
						"title": "Snapshot",
						"mimeType": "text/html"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
