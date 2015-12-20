import { bootstrap } from 'angular2/platform/browser';
import { Component } from 'angular2/core';

class Article{
  votes: number;
  title: string;
  link: string;
  
  constructor(title: string, link: string, votes: number){
    this.title = title;
    this.link = link;
    this.votes = votes || 0;
  }
  
  voteUp(): void {
    this.votes += 1;
    return false;
  }
  
  voteDown(): void {
    this.votes -= 1;
  }
}

@Component({
  selector: 'reddit-article',
  inputs: ['article'],
  host: {
    class: 'row'
  },
  template: `
  <div class="four wide column center aligned votes">
    <div class="ui statistic">
      <div class="value"> {{ article.votes }} </div>
      <div class="label">Points </div>
    </div>
  </div>
    <div class="twelve wide column">
      <a class="ui large header" href="{{ article.link }}"> {{ article.title }}</a>
      <ul class="ui big horizontal list voters">
        <li class="item">
          <a href (click)="voteUp()">
            <i class="arrow up icon"></i> upvote
          </a>
        </li>
        <li class="item">
          <a href (click)="voteDown()">
            <i class="arrow down icon"></i>downvote
          </a>
        </li>
      </ul>
  </div>
  `
})


class ArticleComponent{
  article: Article;
  
  constructor(){
    this.article = new Article('Angular', 'http://angular.io', 10);
  }
  
  voteUp(): boolean {
    this.article.voteUp();
    return false;
  }
  
  voteDown(): boolean {
    this.article.voteDown();
    return false;
  }
  
  
}

@Component({
  selector: 'reddit',
  directives: [ArticleComponent],
  template: `
    <form class="ui large form segment">
      <h3 class="ui header">Add a link</h3>
      
      <div class="field">
        <label for="title">Title:</label>
        <input type="text" name="title" #newTitle>
      </div>
      
      <div class="field">
        <label for="link">Link:</label>
        <input name="link"  #newLink>
      </div>
      
      <button class="ui positive right floated button" (click)="addArticle(newTitle.value, newLink)">
        Submit
      </button>
      
      <div class="ui grid posts">
        <reddit-article>
        </reddit-article>
      </div>
    </form>
  `
})

class RedditApp{
  constructor(){}
  
  addArticle(title: string, link: HTMLInputElement): void {
    console.log(`Adding title: ${title} and link: ${link.value}`);
  }
}

bootstrap(RedditApp);
