// use std::iter::{IntoIterator, Iterator};

// Q. why the first one is used under the hood instead of the later one?
trait Iterator {
    type: Item;
    fn next(&mut self) -> Option<Self::item>;
}

trait Iterator<Item>{
    fn next(&mut self) -> Option<Item>;
}

pub fn add() {
    for i in vec!["a", "b", "c"] {}

    // the above 'for loop' will be converted to this under the hood
    let mut iter = vec!["a", "b", "c"].into_iter();
    while let Some(e) = iter.next() {
        
    }
    
    // 
    let s1 = String::from("hello");
    let s2 = String::from("hii");
    let s3 = String::from("what's up!");
    let arr = vec![s1, s2, s3];
    
    for v in arr {
        println!("{v}");
    }
    
    for v in  arr.iter() {
        println!("{v}");
    }
    
    let vs = vec![1, 2, 3];
    for v in vs {
        // consumes vs, will move the ownerships
        // this will call the `into_iter()` which will move the value of the vector
        // so we will not be able to use these values later on
    }
    
    for v in vs.iter() {
        // borrows vs, & (ref) to v
        // values will be borrowed here as reference
    }
    
    for v in &vs {
        // equivalent to `vs.iter()`
    }
}


