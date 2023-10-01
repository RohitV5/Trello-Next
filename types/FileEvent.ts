import { SyntheticEvent } from "react";

interface EventHandler<E extends SyntheticEvent<any>> {
    (event: E): void;
  }
  
  type FormEventHandler<T> = EventHandler<FormEvent<T>>;
  
  /* ... */
  
  interface FormEvent<T> extends SyntheticEvent<T> {
  }