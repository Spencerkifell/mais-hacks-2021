# To Load WebApp:
# uvicorn --host 0.0.0.0 main:app --reload
from typing import Optional

from fastapi import FastAPI
import gpt_2_simple as gpt2
from fastapi.middleware.cors import CORSMiddleware

def generate(session, checkpoint, prefix=None, multiple=False, **xargs):

    if prefix:
        return gpt2.generate(session, run_name=checkpoint, length=1023, prefix=prefix, truncate="<|endoftext|>", **xargs)
        # prefix = input("Enter another prompt (Press enter with no input to exit)")
    else:
        return gpt2.generate(session, run_name=checkpoint, length=1023, prefix="<|startoftext|>", truncate="<|endoftext|>", **xargs)

app = FastAPI()

origins = ["*",
           "http://localhost:3000/",
           "http://localhost/",
           "https://localhost:3000/",
           "https://localhost/"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}


@app.get("/predict")
def return_prediction(input_str: str):
    try:
        sess = gpt2.start_tf_sess()
        gpt2.load_gpt2(sess, run_name="Board-Small-Model-Cool")
        prediction = generate(sess, "Board-Small-Model-Cool", prefix="{0}\n\nOBJECTIVE OF {0}: ".format(input_str.upper()),
                          top_k=40, temperature=0.9, return_as_list=True)[0]

        line_length = 0
        count = 0
        for x in prediction:
            if x == '\n':
                line_length = 0
            else:
                line_length += 1
            if line_length >= 150:
                prediction = prediction[:count] + '\n' + prediction[count:]
                line_length = 0
            count += 1

        gpt2.reset_session(sess)
        return {"prediction": prediction}
    except Exception:
        print(Exception)
        gpt2.reset_session(sess)
        return_prediction(input_str=input_str)
