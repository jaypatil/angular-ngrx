import { Observable, from } from 'rxjs';
import { Subject } from 'rxjs';

import { mergeMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

import { InjectionToken, ModuleWithProviders, Inject, Injectable, NgModule } from '@angular/core';

// export declare const DB_INSERT = "DB_INSERT";
// export declare const DatabaseBackend: InjectionToken<{}>;
// export declare const IDB_SCHEMA: InjectionToken<{}>;

const IDB_SUCCESS = 'success';
const IDB_COMPLETE = 'complete';
const IDB_ERROR = 'error';
const IDB_UPGRADE_NEEDED = 'upgradeneeded';
const IDB_TXN_READ = 'readonly';
const IDB_TXN_READWRITE = 'readwrite';
export const DB_INSERT = 'DB_INSERT';
export const DatabaseBackend = new InjectionToken('IndexedDBBackend');
export const IDB_SCHEMA = new InjectionToken('IDB_SCHEMA');
export function getIDBFactory() {
  return typeof window !== 'undefined' ? window.indexedDB : self.indexedDB;
}

export type DBUpgradeHandler = (db: IDBDatabase) => void;
export interface DBStore {
  primaryKey?: string;
  autoIncrement?: boolean;
}
export interface DBSchema {
  version: number;
  name: string;
  stores: {
    [storename: string]: DBStore;
  };
}
// export declare function getIDBFactory(): IDBFactory;
export class Database {
  changes: Subject<any>;
  private _idb;
  private _schema;

  constructor(idbBackend: any, schema: any) {
    this.changes = new Subject();
    this._schema = schema;
    this._idb = idbBackend;
  }
  // private _mapRecord(objectSchema);
  // private _upgradeDB(observer, db);
  // private _createObjectStore(db, key, schema);
  // open(dbName: string, version?: number, upgradeHandler?: DBUpgradeHandler): Observable<IDBDatabase>;
  // deleteDatabase(dbName: string): Observable<any>;
  // insert(storeName: string, records: any[], notify?: boolean): Observable<any>;
  // get(storeName: string, key: any): Observable<any>;
  // query(storeName: string, predicate?: (rec: any) => boolean): Observable<any>;
  // executeWrite(storeName: string, actionType: string, records: any[]): Observable<any>;
  // compare(a: any, b: any): number;

  private _mapRecord = objectSchema => dbResponseRec => {
    if (!objectSchema.primaryKey) {
      dbResponseRec.record['$key'] = dbResponseRec['$key'];
    }
    return dbResponseRec.record;
  };

  private _upgradeDB = (observer, db) => {
    this._schema.stores.map(storeName => {
      if (db.objectStoreNames.contains(storeName)) {
        db.deleteObjectStore(storeName);
      }
      this._createObjectStore(db, storeName, this._schema.stores[storeName]);
    });
    observer.next(db);
    observer.complete();
  };

  private _createObjectStore = (db, key, schema) => {
    const objectStore = db.createObjectStore(key, { autoIncrement: true, keyPath: schema.primaryKey });
  };

  // open(dbName: string, version?: number, upgradeHandler?: DBUpgradeHandler): Observable<IDBDatabase>;
  open = (dbName: string, version?: number, upgradeHandler?: DBUpgradeHandler): Observable<IDBDatabase> => {
    if (version === void 0) {
      version = 1;
    }
    const idb = this._idb;
    return Observable.create(function(observer) {
      const openReq = idb.open(dbName, this._schema.version);
      const onSuccess = function(event) {
        observer.next(event.target.result);
        observer.complete();
      };
      const onError = function(err) {
        console.log(err);
        observer.error(err);
      };
      const onUpgradeNeeded = function(event) {
        this._upgradeDB(observer, event.target.result);
      };
      openReq.addEventListener(IDB_SUCCESS, onSuccess);
      openReq.addEventListener(IDB_ERROR, onError);
      openReq.addEventListener(IDB_UPGRADE_NEEDED, onUpgradeNeeded);
      return function() {
        openReq.removeEventListener(IDB_SUCCESS, onSuccess);
        openReq.removeEventListener(IDB_ERROR, onError);
        openReq.removeEventListener(IDB_UPGRADE_NEEDED, onUpgradeNeeded);
      };
    });
  };

  deleteDatabase = (dbName: string): Observable<any> => {
    return Observable.create(function(deletionObserver) {
      const deleteRequest = this._idb.deleteDatabase(dbName);
      const onSuccess = function(event) {
        deletionObserver.next(null);
        deletionObserver.complete();
      };
      const onError = function(err) {
        return deletionObserver.error(err);
      };
      deleteRequest.addEventListener(IDB_SUCCESS, onSuccess);
      deleteRequest.addEventListener(IDB_ERROR, onError);
      return function() {
        deleteRequest.removeEventListener(IDB_SUCCESS, onSuccess);
        deleteRequest.removeEventListener(IDB_ERROR, onError);
      };
    });
  };

  insert = (storeName: string, records: any[], notify?: boolean): Observable<any> => {
    if (notify === void 0) {
      notify = true;
    }
    const write$ = this.executeWrite(storeName, 'put', records);
    //return _do.call(write$, function(payload) {
    return _do.call(write$, function(payload) {
      return notify ? this.changes.next({ type: DB_INSERT, payload: payload }) : {};
    });
  };

  get = (storeName, key) => {
    const open$ = this.open(this._schema.name);
    return mergeMap.call(open$, function(db) {
      return Observable.create(function(txnObserver) {
        const recordSchema = this._schema.stores[storeName];
        const mapper = this._mapRecord(recordSchema);
        const txn = db.transaction([storeName], IDB_TXN_READ);
        const objectStore = txn.objectStore(storeName);
        const getRequest = objectStore.get(key);
        const onTxnError = function(err) {
          return txnObserver.error(err);
        };
        const onTxnComplete = function() {
          return txnObserver.complete();
        };
        const onRecordFound = function(ev) {
          return txnObserver.next(getRequest.result);
        };
        txn.addEventListener(IDB_COMPLETE, onTxnComplete);
        txn.addEventListener(IDB_ERROR, onTxnError);
        getRequest.addEventListener(IDB_SUCCESS, onRecordFound);
        getRequest.addEventListener(IDB_ERROR, onTxnError);
        return function() {
          getRequest.removeEventListener(IDB_SUCCESS, onRecordFound);
          getRequest.removeEventListener(IDB_ERROR, onTxnError);
          txn.removeEventListener(IDB_COMPLETE, onTxnComplete);
          txn.removeEventListener(IDB_ERROR, onTxnError);
        };
      });
    });
  };
  query = (storeName, predicate) => {
    const open$ = this.open(this._schema.name);
    return mergeMap.call(open$, function(db) {
      return new Observable(function(txnObserver) {
        const txn = db.transaction([storeName], IDB_TXN_READ);
        const objectStore = txn.objectStore(storeName);
        const getRequest = objectStore.openCursor();
        const onTxnError = function(err) {
          return txnObserver.error(err);
        };
        const onRecordFound = function(ev) {
          const cursor = ev.target.result;
          if (cursor) {
            if (predicate) {
              const match = predicate(cursor.value);
              if (match) {
                txnObserver.next(cursor.value);
              }
            } else {
              txnObserver.next(cursor.value);
            }
            cursor.continue();
          } else {
            txnObserver.complete();
          }
        };
        txn.addEventListener(IDB_ERROR, onTxnError);
        getRequest.addEventListener(IDB_SUCCESS, onRecordFound);
        getRequest.addEventListener(IDB_ERROR, onTxnError);
        return function() {
          getRequest.removeEventListener(IDB_SUCCESS, onRecordFound);
          getRequest.removeEventListener(IDB_ERROR, onTxnError);
          txn.removeEventListener(IDB_ERROR, onTxnError);
        };
      });
    });
  };

  executeWrite = (storeName, actionType, records) => {
    const changes = this.changes;
    const open$ = this.open(this._schema.name);
    return mergeMap.call(open$, function(db) {
      return Observable.create(function(txnObserver) {
        const recordSchema = this._schema.stores[storeName];
        const mapper = this._mapRecord(recordSchema);
        const txn = db.transaction([storeName], IDB_TXN_READWRITE);
        const objectStore = txn.objectStore(storeName);
        const onTxnError = function(err) {
          return txnObserver.error(err);
        };
        const onTxnComplete = function() {
          return txnObserver.complete();
        };
        txn.addEventListener(IDB_COMPLETE, onTxnComplete);
        txn.addEventListener(IDB_ERROR, onTxnError);
        const makeRequest = function(record) {
          return Observable.create(function(reqObserver) {
            let req;
            if (recordSchema.primaryKey) {
              req = objectStore[actionType](record);
            } else {
              const $key = record['$key'];
              const $record = Object.assign({}, record);
              delete $record.key;
              req = objectStore[actionType]($record, $key);
            }
            req.addEventListener(IDB_SUCCESS, function() {
              const $key = req.result;
              reqObserver.next(mapper({ $key: $key, record: record }));
            });
            req.addEventListener(IDB_ERROR, function(err) {
              reqObserver.error(err);
            });
          });
        };
        const requestSubscriber = mergeMap.call(from(records), makeRequest).subscribe(txnObserver);
        return function() {
          requestSubscriber.unsubscribe();
          txn.removeEventListener(IDB_COMPLETE, onTxnComplete);
          txn.removeEventListener(IDB_ERROR, onTxnError);
        };
      });
    });
  };

  compare = (a, b) => {
    return this._idb.cmp(a, b);
  };

  ctorParameters = () => {
    return [
      { type: undefined, decorators: [{ type: Inject, args: [DatabaseBackend] }] },
      { type: undefined, decorators: [{ type: Inject, args: [IDB_SCHEMA] }] }
    ];
  };
}
@NgModule({
  imports: [],
  providers: [Database, { provide: DatabaseBackend, useFactory: getIDBFactory }]
})
export class DBModule {
  // static provideDB(schema: DBSchema): ModuleWithProviders;
  static provideDB = schema => {
    return {
      ngModule: DBModule,
      providers: [{ provide: IDB_SCHEMA, useValue: schema }]
    };
  };
  ctorParameters = () => [];
}
