import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser';
import { AppModule } from '../app.module';
import { BugTrackerComponent } from './bugTracker.component';

describe('Bug Tracker component', () => {
    let component: BugTrackerComponent,
        fixture: ComponentFixture<BugTrackerComponent>,
        el : DebugElement,
        testBugsData = [
            { id : 1, name : 'bug - 1',desc : '', isClosed : false, createdAt : new Date(), isActive : true},
            { id : 2, name : 'bug - 2',desc : '', isClosed : false, createdAt : new Date(), isActive : false},
            { id : 3, name : 'bug - 3',desc : '', isClosed : false, createdAt : new Date(), isActive : true}
        ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports : [AppModule]
        })
        .compileComponents()
        .then(() => {
            fixture = TestBed.createComponent(BugTrackerComponent)
            component = fixture.componentInstance,
            el = fixture.debugElement
        })
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    })

    it('should display the course list', () => {
        component.bugs = testBugsData;

        fixture.detectChanges();
        
        const bugItems = el.queryAll(By.css('ol li'))

        expect(bugItems).toBeTruthy('No bugs displayed');
        expect(bugItems.length).toBe(3);
    })

})