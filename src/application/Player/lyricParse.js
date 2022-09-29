//[00:35.080]不为谁而作的歌 歌词格式
//解析[00:35.080] 时间戳
const timeExp = /\[(\d{2,}):(\d{2,})(?:\.(\d{2,3}))?]/g

const STATE_PAUSE = 0
const STATE_PLAYING = 1
export default class Lyric {
    /**
   * @params {string} lrc
   * @params {function} handler
  */ 
    constructor(lrc,handler=()=>{}){
        this.lrc = lrc
        this.lines = [] //解析后的数组 包含对应的时间和歌词
        this.handler = handler //回调函数
        this.state = STATE_PAUSE //播放状态
        this.curLineIndex =0 //当前解析所在行数
        this.startStamp = 0 //开始的时间戳
        this.initialLines()
    }
    initialLines(){
        //按行数进行分割
        const lines = this.lrc.split('\n')
        lines.forEach((item,index)=>{
          const line = lines[index];
          //result =>
          ///\[(\d{2,}):(\d{2,})(?:\.(\d{2,3}))?]/g.exec('[00:35.080]不为谁而作的歌')
          //(4) ['[00:35.080]', '00', '35', '080', index: 0, input: '[00:35.080]不为谁而作的歌', groups: undefined]
          let result = timeExp.exec(line);
          // if(!result) continue
          const txt = line.replace(timeExp, "").trim(); //去掉时间戳
          if (txt) {
            if (result[3].length === 3) {
                //转化 保留前两位
              result[3] = result[3] / 10;
            }
            this.line.push({
              time:
                result[1] * 60 * 1000 +
                result[2] * 1000 +
                (result[3] || 0) * 10, // 转化具体到毫秒的时间，result [3] * 10 可理解为 (result / 100) * 1000
              txt
            });
          }
        })
        //根据时间排序
        this.lines.sort((a,b)=>{
            return a.time-b.time
        })
    }
    play(offset=0,isSeek = false){
        if(!this.lines.length) return
        this.state = STATE_PLAYING
        //找到当前所在行
        this.curLineIndex = this.findCurlineIndex(offset)
        this.callHandler(this.curLineIndex-1)
        this.startStamp = +new Date() - offset

        if(this.curLineIndex<this.line.length){
            // clearTimeOut(this.timer)
            this.playRest(isSeek)
        }
    }
    findCurLineIndex(time){
        this.lines.forEach((item,index)=>{
            if(time<item.time){
                return index
            }
        })
        return this.lines.length -1
    }

}