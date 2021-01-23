import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { BugServerService } from './bugServer.service'
import { Bug } from '../models/Bug'

describe('BugServer', () => {
    let bugServer : BugServerService,
        httpTestingController : HttpTestingController,
        testBugsData = [
            { id : 1, name : 'bug - 1', isClosed : false, createdAt : new Date(), isActive : true},
            { id : 2, name : 'bug - 2', isClosed : false, createdAt : new Date(), isActive : false},
            { id : 3, name : 'bug - 3', isClosed : false, createdAt : new Date(), isActive : true}
        ]

    beforeEach(() =>{
        TestBed.configureTestingModule({
            imports : [
                HttpClientTestingModule
            ],
            providers: [
                BugServerService,
            ]
        });

        bugServer = TestBed.inject(BugServerService);
        httpTestingController = TestBed.inject(HttpTestingController);
    })
    it('should retrieve all the bugs', () => {
        bugServer
            .getAll()
            .subscribe( bugs => {

                expect(bugs).toBeTruthy('No bugs retured');

                expect(bugs.length).toBe(2, "incorrect number of bugs");

                const bug = bugs.find(b => b.id === 3);

                expect(bug.name).toBe('bug - 3');

                const inActiveBugs = bugs.filter(bug => !bug.isActive);

                expect(inActiveBugs.length).toBe(0, 'Inactive bugs are returned')
            });

        const req = httpTestingController.expectOne('http://localhost:3000/bugs');
        expect(req.request.method).toBe('GET');
        req.flush(testBugsData);
        
    })

     it('should create a new bug', () => {
         const testNewBug  : Bug = {
             id : 0,
             name : "test bug",
             desc : '',
            isClosed : false, createdAt : new Date(),isActive : true
         }
        bugServer
            .save(testNewBug)
            .subscribe( newBug => {
                console.log(newBug);
                expect(newBug).toBeTruthy('No bugs retured');
                expect(newBug.name).toBe('test bug');

            });

        const req = httpTestingController.expectOne('http://localhost:3000/bugs');
        expect(req.request.method).toBe('POST');
        req.flush({
             id : 0,
             name : "test bug",
             desc : '',
            isClosed : false, createdAt : new Date(),isActive : true
         });
        
    })

    it('should update a existing bug', () => {
         const testUpdatedBug  : Bug = {
             id : 5,
             name : "test bug",
             desc : '',
            isClosed : false, createdAt : new Date(),isActive : true
         }
        bugServer
            .save(testUpdatedBug)
            .subscribe( updatedBug => {
                expect(updatedBug).toBeTruthy('No bugs retured');
            });

        const req = httpTestingController.expectOne('http://localhost:3000/bugs/5');
        expect(req.request.method).toBe('PUT');
        req.flush({
             id : 5,
             name : "test bug",
             desc : '',
            isClosed : false, createdAt : new Date(),isActive : true
         });
        
    })
})