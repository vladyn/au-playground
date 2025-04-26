import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {PLATFORM} from 'aurelia-pal';

describe('Tabs', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/resources/elements/tabs/tabs'))
      .inView(`<tabs>
      <tab header="Top Movies">
        <ul>
          <li>The Shawshank Redemption</li>
          <li>The Godfather</li>
          <li>The Godfather: Part II</li>
          <li>The Dark Knight</li>
          <li>12 Angry Men</li>
        </ul>
      </tab>
      <tab header="Top TV Shows">
        <ul>
          <li>Planet Earth II</li>
          <li>Band of Brothers</li>
          <li>Game of Thrones</li>
          <li>Planet Earth</li>
          <li>Breaking Bad</li>
        </ul>
      </tab>
    </tabs>`);
      
  });

  it('should render tabs', done => {
    const result = component.create(bootstrap)
    .then((res) => {
      console.log(res)
      console.log(result);
      done();
    }).catch(e => { 
      console.log(e.toString());
      done();
    });
  });
});
