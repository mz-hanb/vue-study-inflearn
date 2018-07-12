var app = new Vue({
  el: '#app',
  data: {
    searchWords: '',
    viewMode: '', // onResult, onSearch
    selectedKind: '',
    searchList: [],    
    searchListKind: [
      {name: 'recommend', label: '추천 검색어'}, 
      {name: 'latest', label: '최근 검색어'}, 
    ],
    results: []    
  },
  created: function(){
    this.viewMode = 'onSearch';
    this.selectedKind = this.searchListKind[0].name;
    this.searchList = SearchListModel[this.selectedKind];
    this.results = ResultModel;
  }, 
  computed: {
    onResultMode: function () {
      return this.viewMode === 'onResult';
    },
        
  
  },
  watch: {
    viewMode: function () {
      console.log( 'watch> ' + this.viewMode);
    }, 
    searchWords: function(){
      
    }
  },

  methods: {       
    checkWords: function(){
      if( !this.searchWords ){
        this.initSearch();
      }
    },
    // 앱화면 초기화
    initSearch: function(){      
      this.searchWords = ''; 
      this.viewMode = 'onSearch';
    },

    // 검색결과보기
    showResult: function (words) {      
      if( !this.searchWords.length ) return;
      this.searchWords = words;
      this.viewMode = 'onResult';      
      this.addLatestSearchList();      
    }, 
    
    // 검색어종류: 최근 검색결과 요소 추가( 앞에 요소 추가 )
    addLatestSearchList: function(){
      SearchListModel.latest.unshift( {word: this.searchWords, date: moment().format('YYYY / M / DD, h:mm:ss a')} );   
    },
    // 검색어종류: 최근 검색결과 요소 삭제
    removeLatestSearchList: function(idx){      
      SearchListModel.latest.splice( idx, 1 );      
    },
    // 검색어 종류: 리스트 바꿈
    setSearchList: function(kindName){
      // console.log( kindName );
      this.selectedKind = kindName;      
      this.searchList = [];
      this.searchList = SearchListModel[this.selectedKind];
    }
  }
})