import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tree-wrapper',
  templateUrl: './tree-wrapper.component.html',
  styleUrls: ['./tree-wrapper.component.scss']
})
export class TreeWrapperComponent implements OnInit {

  nodeItems: any[] = [];
  nodes: any[] = [];
  options:any = {};
  isTreeLoaded: boolean = false;

  constructor(private dataSvc: DataService) { 
   
  }

  ngOnInit(): void {
   
    this.dataSvc.GetDummyData().subscribe( data => {
      if(data && data.length) {
      
        this.nodes = [
          {
            id: 333,
            name: 'Case',
            children: [
            ]
          }
        ];
         
        data.forEach(val => {
          this.nodes[0].children.push({
            id: val.objectID,
            name: val.name + '(view)'
          })
        });
        /*this.nodes[0].children.push( 
          { id: 2, name: 'child1' },
          { id: 3, name: 'child2' });*/
        console.log('data response ==> ', data, this.nodes);
        this.isTreeLoaded = true;
      }
    })
    /*this.nodes = [
      {
        id: 1,
        name: 'Case',
        children: [
          { id: 2, name: 'child1' },
          { id: 3, name: 'child2' }
        ]
      },
      {
        id: 4,
        name: 'root2',
        children: [
          { id: 5, name: 'child2.1' },
          {
            id: 6,
            name: 'child2.2',
            children: [
              { id: 7, name: 'subsub' }
            ]
          }
        ]
      }
    ];*/

    this.nodeItems = [{
      id: '0',
      name: 'Heros',
      children: [
        {
          id: '1',
          name: 'Batman',
          item: {
            phrase: 'I am the batman'
          }
        },
        {
          id: '2',
          name: 'Superman',
          item: {
            phrase: 'Man of steel'
          }
        }
      ]
    },
    {
      id: '3',
      name: 'Villains',
      children: [
        {
          id: '4',
          name: 'Joker',
          item: {
            phrase: 'Why so serius'
          }
        },
        {
          id: '5',
          name: 'Lex luthor',
          item: {
            phrase: 'I am the villain of this story'
          }
        }
      ]
    }];
    console.log('What is this ==> ', this.nodeItems[0]);
  }
  treeNgx(): void {
    console.log('fired tree ngx--->');
  }
  onEvent(event?:any) {
    console.log('tree event ==>', event);
  }
  onActiveEvent(event?:any) {
    console.log('Activate tree event ==>', event);
  }
}
