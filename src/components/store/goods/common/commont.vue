<template>
  <div class="comment-box">
    <!--取得评论总数-->
    <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
      <div class="avatar-box">
        <i class="iconfont icon-user-full"></i>
      </div>
      <div class="conn-box">
        <div class="editor">
          <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
          <span class="Validform_checktip"></span>
        </div>
        <div class="subcon">
          <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
          <span class="Validform_checktip"></span>
        </div>
      </div>
    </form>
    <ul id="commentList" class="list-box">
      <p style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
      
      <li v-for="(item,i) in commentList" :key="i">
        <div class="avatar-box">
          <i class="iconfont icon-user-full"></i>
        </div>
        <div class="inner-box">
          <div class="info">
            <span>{{item.user_name}}</span>
            <span>{{item.add_time}}</span>
          </div>
          <p>{{item.content}}</p>
        </div>
      </li>
    
    </ul>
    <!--放置页码-->
    <div class="page-box" style="margin:5px 0 0 62px">
      <div id="pagination" class="digg">
        <span class="disabled">« 上一页</span>
        <span class="current">1</span>
        <span class="disabled">下一页 »</span>
      </div>
    </div>
    <!--/放置页码-->
  </div>

</template>
<script>
  export default{
    data () {
      return {
        id:null,
        query:{
          pageIndex:1,
          pageSize:10
        },
        commentList:[]
      }
    },
    props: ['tableName'],
    methods: {
      getCommontList(){
        this.$http.get(this.$api.commentList+this.tableName+"/"+this.id,{params:this.query}).then(res=>{
          // console.log(res.data.message);
          this.commentList=res.data.message;
        })
      },
      giveCommont(){

      }  
    },
    created () {
      // console.log(this.tableName);
      
      
     
      this.id=this.$route.params.id;
      this.getCommontList();
      // console.log(this.id);
    }

  }
</script>
<style>
</style>