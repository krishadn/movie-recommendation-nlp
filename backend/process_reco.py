import tensorflow as tf
import tensorflow_hub as hub
import sys
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import NearestNeighbors
from sklearn.decomposition import PCA
import dill

model_url = "https://tfhub.dev/google/universal-sentence-encoder/4"
model = hub.load(model_url)
df = pd.read_csv("backend\\tmdb_movies_data.csv")
df = df[["original_title","genres","overview"]]
df = df.dropna()
df = df.reset_index()
df = df[["original_title","genres","overview"]]
titles = list(df["overview"][:10000])

# def dl_model(model):
#     with open("backend\\model", 'wb') as file:
#         dill.dump(model, file)


# def open_model():
#     model = None
#     with open("backend\\model.pkl", 'rb') as file:
#         model = dill.load(file)
#     return model


def embed(model, texts):
    return model(texts)


def recommend_movies(text):
    sys.setrecursionlimit(100000)
    embeddings = embed(model, titles)
    nn = NearestNeighbors(n_neighbors=20)
    nn.fit(embeddings)

    embedded = embed(model, [text])
    neighbors = nn.kneighbors(embedded, return_distance=False)[0]
    return df["original_title"].iloc[neighbors].tolist()




if __name__=="__main__":
    print(recommend_movies("babe"))

