// 入场
bgIMG.style.opacity = "1"
// 背景图片(本地存储 或 默认图)
bgIMG.src = localStorage.getItem("bgIMG") || "http://imgsubmit.oss-cn-beijing.aliyuncs.com/img/PisgahNationalForest_ROW7154333793_1920x1080.jpg"


// footer 年份
cYear.innerText = new Date().getFullYear()

// 时间展示
startTime()

function startTime() {
  const timeText = document.getElementById("timeText")
  const date = new Date()
  const hours = date.getHours() // 小时
  const minute = date.getMinutes() // 分
  const second = date.getSeconds() // 秒
  timeText.innerHTML = `${hours}:${checkTime(minute)}`
  setTimeout(startTime, 1000)
}

// 补位：当某个字段不是两位数时补0
function checkTime(str) {
  let num
  str >= 10 ? num = str : num = "0" + str
  return num
}

// 获取初始化数据data
let data = init()
let keys = data["keys"]
let hash = data["hash"]
// console.log("keys", keys)
// console.log("hash", hash)

/*
* 监听键盘任意键
* 主页，按下一个任意键盘，激活input
* */
let isHomePage = true
document.addEventListener("keypress", function (e) {
  bgIMG.classList.add("inputFocus")
  // 主页，按键直接激活input
  if (isHomePage) {
    input0.classList.add("focus")
    input0.focus()
    e.preventDefault()
  }
  // 监听键盘字母按键，执行链接跳转
  let {key} = e
  let code = key.toUpperCase().charCodeAt(0)  // console.log("code:", code, "\n", hash, "\n", hash[key])
  if (code >= 65 && code <= 90) {
    // 在input不聚焦的情况下，实行键盘导航的监听
    if (!isInputFocus && !isHomePage) {
      let currentKeyEle = document.querySelector(`ul.row .key.${key}`)
      if (currentKeyEle) {
        if (hash[key]) {
          window.open(`http://${hash[key]}`, "_blank")
        } else {
          window.alert("未设置链接")
        }
      }
    }
    // 在input激活的情况下，添加按键动效
    if (isInputFocus) {
      // 按键动效（按下）
      let currentKeyEle = document.querySelector(`ul.row .key.${e.key}`)
      if (currentKeyEle) {
        currentKeyEle.classList.add("down")
      }
      // 按键动效（抬起）
      document.addEventListener("keyup", function (e) {
        let currentKeyEle = document.querySelector(`ul.row .key.${e.key}`)
        if (currentKeyEle) {
          currentKeyEle.classList.remove("down")
        }
      })
    }
  }
  // 监听回车：输入框有值前提下，获取搜索引擎，执行搜索跳转
  if (input0.value && key === "Enter") {
    let searchValue = input0.value.replace(/\+/g, "%2B") // 解决：搜索内容中无法识别加号
    let searchEngine = document.querySelector(".searchOpt.selected")
    // console.log(`searchEngine: ${searchEngine}`)
    let url
    if (searchEngine.id === "iconBaidu") {
      url = `https://www.baidu.com/s?word=${searchValue.trim()}`
    } else {
      url = `https://www.google.com/search?q=${searchValue.trim()}`
    }
    // console.log(`url: ${url}`)
    window.open(url, "_blank")
  }
})

/*
* 监听input0激活事件
* 用于鼠标直接激活input的情况
* */
let isInputFocus = false
input0.addEventListener("focus", function () {
  isInputFocus = true
  goToDetail()
  if (count !== 0) {
    keyboard_show()
  } else {
    keyboard_generate()
  }
  input0.addEventListener("keydown", function (e) {
    // console.log(e.key)
    if (e.key === "Escape") {
      input0.blur()
      isInputFocus = false
    }
  })
})


/*
* 切换搜索引擎，添加样式
* 事件代理
* */
searchOptBox.addEventListener("click", function (e) {
  // console.log(`e.target: ${e.target}`)
  let ele = e.target
  while (!ele.id) {
    ele = ele.parentNode
  }
  ele.classList.add("selected")
  $(ele).siblings().removeClass("selected")  // jQuery
})

/*
* 监听鼠标右键：进入详情页
* 生成键盘，显示input激活样式（不聚焦）
* count等于0，表示从未进入过详情页，也就从未生成过键盘
* count等于1，表示第一次进入详情页，执行生成了键盘
* count大于1，表示键盘已存在，无需再次生成，只需控制显示（隐藏）
* */
let count = 0
document.addEventListener("contextmenu", function (e) {
  e.preventDefault()
  isInputFocus = false
  count += 1
  // console.log("按下鼠标右键的次数", count)
  /* 进入详情页 */
  goToDetail()
  if (count === 1) {
    keyboard_generate() // 生成键盘
  } else {
    keyboard_show()  // 显示键盘
  }
})

/*
* 点击cover，隐藏键盘，回到主页
* */
cover.addEventListener("click", function () {
  backToHome()
  // 隐藏键盘
  keyboardBox.style.opacity = "0"
  keyboardBox.style.visibility = "hidden"
})

/*
* 点击键盘，跳转网页
* */
keyboardBox.addEventListener("click", function (e) {
  let li = e.target.closest("li")
  if (li) {
    let letter = li.className.replace("key ", "")
    if (hash[letter]) {
      window.open(`http://${hash[letter]}`)
    }
  }
})


function init() {
  const keys = {
    0: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    1: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    2: ["z", "x", "c", "v", "b", "n", "m"],
    length: 3
  }
  const hashInit = {
    q: "mail.qq.com",
    w: "",
    e: "element.eleme.cn",
    r: "rescuetime.com",
    t: "",
    y: "youtube.com",
    u: "",
    i: "iconfont.cn",
    o: "",
    p: "",
    a: "aliyun.com",
    s: "",
    d: "movie.douban.com",
    f: "fontawesome.com",
    g: "google.com",
    h: "huaban.com",
    j: "juejin.im",
    k: "",
    l: "liubingxuan.xyz",
    z: "zhihu.com",
    x: "",
    c: "",
    v: "v2ex.com",
    b: "bilibili.com",
    n: "nasa.gov",
    m: "developer.mozilla.org"
  }
  const lsDataObj = JSON.parse(localStorage.getItem("h2-data"))
  const hash = lsDataObj || hashInit  // 优先获取本地存储hash数据
  return {"keys": keys, "hash": hash}
}

function createSpan(letter) {
  let span = document.createElement("span")
  span.className = "letter"
  span.textContent = letter
  return span
}

function createButton(letter, link) {
  let button = document.createElement("button")
  button.textContent = "编辑"
  button.id = letter
  button.addEventListener("click", function (e) {  // 给所有button绑定点击事件
    e.stopPropagation()
    let button = e.target  // 获取当前点击的button元素
    let img = button.nextSibling  // 获取当前点击的img元素
    let key = e.target.id // q w e...
    let url = window.prompt("设置链接", link) // link 作为默认值，展示在输入框中
    // console.log("url:null", url === null)
    // console.log("url:空串", url === "")
    hash[key] = simplifyUrl(url) || ""  // 修改hash数据
    if (url === null) {
      console.log(`点击取消`)
      return
    } else if (url === "") {
      hash[key] = ""
      img.src = "http://imgsubmit.oss-cn-beijing.aliyuncs.com/img/dot.png"
    } else {
      console.log(`url有值`)
      img.src = "http://" + url + "/favicon.ico"  // 修改ico地址
      imgCheckError(img, url) // 处理获取失败的情况
    }
    console.log("hash[key]:", hash[key])
    // console.log("hash:", hash)
    localStorage.setItem("h2-data", JSON.stringify(hash))
    // 重新渲染
    generateKeyboard(keys, hash)
  })
  return button
}

function createImg(domain) {
  // console.log(domain)
  let img = document.createElement("img")
  if (domain) {
    img.src = "http://" + domain + "/favicon.ico"
    imgCheckError(img, domain)
  } else {
    img.src = "http://imgsubmit.oss-cn-beijing.aliyuncs.com/img/dot.png"
  }
  return img
}

function generateKeyboard(keys, hash) {
  keyboardBox.textContent = ""  // 先清空原有键盘，再生成新的
  for (let i = 0; i < data.keys.length; i++) {  // i => 0 1 2
    let ul = document.createElement("ul")
    ul.className = "row"
    keyboardBox.appendChild(ul)
    let currentRow = keys[i]
    for (let j = 0; j < currentRow.length; j++) {  // j => 10 9 7
      let letter = currentRow[j]
      let span = createSpan(letter)
      let button = createButton(letter, hash[letter])
      let img = createImg(hash[letter])
      let li = document.createElement("li")
      li.className = `key ${letter}`
      li.appendChild(span)
      li.appendChild(button)
      li.appendChild(img)
      ul.appendChild(li)
    }
  }
}

/*
* 用于优化 link 显示的内容（在渲染html结构时调用）
* 需要考虑用户可能输入的各种情况
* replace 返回新的字符串（所以可以链式调用）
* */
function simplifyUrl(url) {
  if (url) {
    return url.replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .replace(/\/.*/, "")  // 删除 / 开头的内容 （需要转义）
  }
}

// 获取ico失败的处理
function imgCheckError(img, domain) {
  img.addEventListener("error", function (e) {
    // e.target.src = `https://www.google.com/s2/favicons?sz=64&domain_url=${domain}` // 需FQ
    e.target.src = "http://imgsubmit.oss-cn-beijing.aliyuncs.com/img/website.png"
  })
}

// 显示键盘
function keyboard_show() {
  keyboardBox.style.display = "block"
  keyboardBox.style.visibility = "visible"
  setTimeout(() => {
    keyboardBox.style.opacity = "1"
  })
}

// 生成键盘
function keyboard_generate() {
  generateKeyboard(data.keys, data.hash)
  keyboardBox.style.display = "block"
  setTimeout(() => {
    keyboardBox.style.opacity = "1"
  })
}

// 样式修改：回到主页
function backToHome() {
  isInputFocus = false
  isHomePage = true
  searchOptBox.classList.remove("show")
  bgIMG.classList.remove("inputFocus")
  input0.classList.remove("focus")
  input0.blur()
  input0.value = ""
  file.style.opacity = "0"
  file.style.visibility = "hidden"
}

// 样式修改：进入详情页
function goToDetail() {
  isHomePage = false
  searchOptBox.classList.add("show")
  bgIMG.classList.add("inputFocus")
  input0.classList.add("focus")
  file.style.visibility = "visible"
  setTimeout(() => {
    file.style.opacity = "1"
  })
}
