import gpt_2_simple as gpt2

model_name = "355M"  # Options: 124M, 255M, 774M, 1558M
train_text_file = "data_source/rulebook_dataset_small.txt"
model_save_name = "Board-Small-Model"


def tune():
    gpt2.finetune(sess,
                  dataset=train_text_file,
                  model_name=model_name,
                  steps=2000,
                  restore_from='fresh',
                  run_name=model_save_name,
                  print_every=10,
                  sample_every=100,
                  save_every=200,
                  learning_rate=1e-5,
                  batch_size=1
                  )


def generate(session, checkpoint, prefix=None, multiple=False, **xargs):

    if multiple:
        gen_file = 'checkpoint/{}/Examples.txt'.format(checkpoint)

        gpt2.generate_to_file(session,
                              destination_path=gen_file,
                              length=1023,
                              temperature=0.7,
                              top_k=40,
                              nsamples=6,
                              batch_size=2,
                              prefix="<|startoftext|>",
                              truncate='<|endoftext|>',
                              run_name=checkpoint
                              )

    if prefix:
        return gpt2.generate(session, run_name=checkpoint, prefix=prefix, truncate="<|endoftext|>", **xargs)
        # prefix = input("Enter another prompt (Press enter with no input to exit)")
    else:
        return gpt2.generate(session, run_name=checkpoint, length=1023, prefix="<|startoftext|>", truncate="<|endoftext|>", **xargs)


if __name__ == '__main__':
    # tune()
    sess = gpt2.start_tf_sess()
    gpt2.load_gpt2(sess, run_name="Board-Small-Model-Cool")

    # generate("Board-Small-Model", multiple=True)
    generate(sess, "Board-Small-Model-Cool", prefix="MOUNTAIN BOSS\n\nOBJECTIVE OF MOUNTAIN BOSS: ", top_k=40, temperature=0.9)



